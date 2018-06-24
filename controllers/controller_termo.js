var controller_termo = require('./controller_termo');
var controller_categoria = require('./controller_categoria');

exports.listarCategorias = function(callback) {
  var sql = "SELECT pertence, COUNT(*) AS qtd FROM termo GROUP BY pertence";

  db.query(sql, callback);
};

exports.listar = function(callback) {
  var sql = "SELECT * FROM termo";

  db.query(sql, callback);
};

exports.cadastrar = function (req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  }

  var post = req.body;

  var termo = post.nome;
  var refGramatical = post.refGramatical;
  var sigla = post.sigla;
  var definicao = post.definicao;
  var contexto = post.contexto;
  var nota = post.nota;
  var categoria = post.categoria;
  var equivalente = post.equivalente;

  var variante = post.variante.replace(',', "; ");
  var fraseologia = post.fraseologia.replace(',', "; ");

  var sinonimos = post.sinonimos;
  var remissivas = post.remissivas;

  var alterou = sess.usuario;

  var sql = "INSERT INTO Termo VALUES('" + termo + "', '" + refGramatical + "', '" + sigla + "', '" + variante + "', '" + fraseologia + "', '" + definicao + "', '" + contexto + "', '" + nota + "', '" + equivalente + "', '" + alterou + "', '" + categoria + "')";
  var messtatus = 'danger';
  var mes;

  var sinSql = ''; //sql para os sinonimos

  if (sinonimos.length == 1) {
    sinSql += "INSERT INTO sinonimo VALUES ('" + termo + "', '" + sinonimos + "')";
  }
  else if (sinonimos.length > 1) {
    sinSql += "INSERT INTO sinonimo VALUES";
    for (var i = 0; i < sinonimos.length; ++i) {
      sinSql += "('" + termo + "', '" + sinonimos[i] + "')" ;
      if (i < sinonimos.length - 1 ) sinSql += ', ';
    }
  }

  var remSql = ''; // sql para os remissivos

  if (remissivas.length == 1) {
    remSql += " INSERT INTO remissivas VALUES ('" + termo + "', '" + remissivas +"')" ;
  }
  else if (remissivas.length > 1){
    remSql += "INSERT INTO remissivas VALUES";
    for (var i = 0; i < remissivas.length; ++i) {
      remSql += "('" + termo + "', '" + remissivas[i] + "')" ;
      if (i < remissivas.length - 1 ) remSql += ', ';
    }
  }

  db.query(sql, function(err, results) {
    if(err == null) {
     messtatus = 'success';
     mes = 'Termo Inserido com Sucesso.';
    }
    else if (err.code == 'ER_DUP_ENTRY') mes = 'Erro na Inserção. Termo já Inserido.';
    else if(err) mes = 'Erro na Inserção.';

    db.query(sinSql, function(err, resultSin) {
      db.query(remSql, function(err, resultRem) {
        controller_termo.listarCategorias(function(err, resultsTermoCategorias) {
          controller_categoria.listar(function(err, resultsTodasCategorias) {
            controller_termo.listar(function(err, resultsTermo) {
              res.render('termo', {
                usuario: req.session.nome,
                permissao: req.session.permissao,
                message_status: messtatus,
                message: mes,
                scriptEdit: '',
                pesquisaTexto: '',
                dataTermo: '',
                dataTermos: resultsTermo,
                dataTodasCategorias: resultsTodasCategorias,
                dataCategorias: resultsTermoCategorias,
                dataRem: '',
                dataSin: ''
              });
            });
          });
        });
      });
    });
  });
};

exports.pesquisar = function(req, res, next) {
  var valor = req.body['pesquisa-texto'];

  var sqlCategorias = "SELECT pertence, COUNT(*) AS qtd FROM termo WHERE nome LIKE '%" + valor + "%' GROUP BY pertence";
  var sqlTermos = "SELECT nome, pertence FROM termo WHERE nome LIKE '%" + valor + "%'";

  db.query(sqlCategorias, function(err, resultsTermoCategorias) {
    db.query(sqlTermos, function(err, resultsTermo) {
      controller_categoria.listar(function(err, resultsTodasCategorias) {
        res.render('termo', {
          usuario: req.session.nome,
          permissao: req.session.permissao,
          message_status: '',
          message: '',
          scriptEdit: '',
          pesquisaTexto: valor,
          dataTermo: '',
          dataTermos: resultsTermo,
          dataTodasCategorias: resultsTodasCategorias,
          dataCategorias: resultsTermoCategorias,
          dataRem: '',
          dataSin: ''
        });
      });
    });
  });
};

exports.exibir = function(req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  }

  var nome = req.params.nome;

  var sql = "SELECT * FROM termo WHERE nome = '" + nome + "'";

  var remSql = "SELECT termoRemissivo FROM remissivas WHERE termo = '" + nome + "'";
  var sinSql = "SELECT termoSinonimo FROM sinonimo WHERE termo = '" + nome + "'";

  db.query(sql, function(err, result) {
    db.query(remSql, function(err, resultRem) {
      db.query(sinSql, function(err, resultSin) {
        controller_termo.listarCategorias(function(err, resultsTermoCategorias) {
          controller_categoria.listar(function(err, resultsTodasCategorias) {
            controller_termo.listar(function(err, resultsTermo) {
              res.render('termo', {
                usuario: req.session.nome,
                permissao: req.session.permissao,
                message_status: '',
                message: '',
                scriptEdit: '#exibTermo',
                pesquisaTexto: '',
                dataTermo: result,
                dataTermos: resultsTermo,
                dataTodasCategorias: resultsTodasCategorias,
                dataCategorias: resultsTermoCategorias,
                dataRem: resultRem,
                dataSin: resultSin
              });
            });
          });
        });
      });
    });
  });
};

exports.remocao = function (req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  }

  var nome  = req.params.nome;

  var sql = "SELECT * FROM termo where nome = '" + nome + "'";

  db.query(sql, function(err, results) {
    controller_termo.listarCategorias(function(err, resultsTermoCategorias) {
      controller_categoria.listar(function(err, resultsTodasCategorias) {
        controller_termo.listar(function(err, resultsTermo) {
          res.render('termo', {
            usuario: req.session.nome,
            permissao: req.session.permissao,
            message_status: '',
            message: '',
            scriptEdit: '#removeTermo',
            pesquisaTexto: '',
            dataTermo: results,
            dataTermos: resultsTermo,
            dataTodasCategorias: resultsTodasCategorias,
            dataCategorias: resultsTermoCategorias,
            dataRem: '',
            dataSin: ''
          });
        });
      });
    });
  });
};

exports.remover = function (req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  }
  var post = req.body;
  var nome = post.nome;

  var sql = "DELETE FROM Termo WHERE nome = '" + nome + "'";
  var messtatus = 'danger';
  var mes;

  db.query(sql, function (err, result) {
    if(err == null) {
      messtatus = 'success';
      mes = 'Termo Apagada com Sucesso.';
    }
    else if(err) mes = 'Erro na Remoção.';

    controller_termo.listarCategorias(function(err, resultsTermoCategorias) {
      controller_categoria.listar(function(err, resultsTodasCategorias) {
        controller_termo.listar(function(err, resultsTermo) {
          res.render('termo', {
            usuario: req.session.nome,
            permissao: req.session.permissao,
            message_status: messtatus,
            message: mes,
            scriptEdit: '',
            pesquisaTexto: '',
            dataTermo: '',
            dataTermos: resultsTermo,
            dataTodasCategorias: resultsTodasCategorias,
            dataCategorias: resultsTermoCategorias,
            dataRem: '',
            dataSin: ''
          });
        });
      });
    });
  });
};

exports.edicao = function (req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  }

  var nome  = req.params.nome;

  var sql = "SELECT * FROM termo where nome = '" + nome + "'";

  var remSql = "SELECT termoRemissivo FROM remissivas WHERE termo = '" + nome + "'";
  var sinSql = "SELECT termoSinonimo FROM sinonimo WHERE termo = '" + nome + "'";


  db.query(sql, function(err, results) {
    db.query(remSql, function(err, resultRem) {
      db.query(sinSql, function(err, resultSin) {
        controller_termo.listarCategorias(function(err, resultsTermoCategorias) {
          controller_categoria.listar(function(err, resultsTodasCategorias) {
            controller_termo.listar(function(err, resultsTermo) {
              console.log(resultSin);
              console.log(resultRem);
              res.render('termo', {
                usuario: req.session.nome,
                permissao: req.session.permissao,
                message_status: '',
                message: '',
                scriptEdit: '#editTermo',
                pesquisaTexto: '',
                dataTermo: results,
                dataTermos: resultsTermo,
                dataTodasCategorias: resultsTodasCategorias,
                dataCategorias: resultsTermoCategorias,
                dataRem: resultRem,
                dataSin: resultSin
              });
            });
          });
        });
      });
    });
  });
};

exports.editar = function (req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  }

  var post = req.body;


  var nomeAntigo = post.nomeAntigo;
  var termo = post.nome;
  var refGramatical = post.refGramatical;
  var sigla = post.sigla;
  var definicao = post.definicao;
  var contexto = post.contexto;
  var nota = post.nota;
  var categoria = post.categoria;
  var equivalente = post.equivalente;

  var variante = post.variante.replace(',', "; ");
  var fraseologia = post.fraseologia.replace(',', "; ");

  var sinonimos = post.sinonimos;
  var remissivas = post.remissivas;

  var alterou = sess.usuario;

  var sql = "UPDATE Termo SET nome = '" + termo + "', rg = '" + refGramatical + "', sigla = '" + sigla + "', variante = '" + variante + "', fraseologia = '" + fraseologia + "', definicao = '" + definicao + "', contexto = '" + contexto + "', nota = '" + nota + "', equivalente = '" + equivalente + "', alterou = '" + alterou + "', pertence = '" + categoria + "' WHERE nome = '" + nomeAntigo + "'";
  var messtatus = 'danger';
  var mes;

  console.log(sql);
  console.log(post);


  var sinDelete = "DELETE FROM sinonimo WHERE termo = '" + termo + "'";
  var remDelete = "DELETE FROM remissivas WHERE termo = '" + termo + "'";

  console.log(sinDelete);
  console.log(remDelete);

  var sinSql = ''; //sql para os sinonimos

  if (sinonimos) {

    if (typeof sinonimos == "string") {
      sinSql += "INSERT INTO sinonimo VALUES ('" + termo + "', '" + sinonimos + "')";
    }
    else if (sinonimos.length > 1) {
      sinonimos = sinonimos.filter(function(Any, i, sinonimos) {
        return sinonimos.indexOf(Any) === i;
      });
      console.log(sinonimos);

      sinSql += "INSERT INTO sinonimo VALUES";
      for (var i = 0; i < sinonimos.length; i++) {
        sinSql += " ('" + termo + "', '" + sinonimos[i] + "')" ;
        if (i < sinonimos.length - 1) sinSql += ', ';
      }
    }
  }

  console.log(sinSql);

  var remSql = ''; // sql para os remissivos

  if (remissivas) {

    if (typeof remissivas == "string") {
      remSql += " INSERT INTO remissivas VALUES ('" + termo + "', '" + remissivas +"')" ;
    }
    else if (remissivas.length > 1) {

      remissivas = remissivas.filter(function(Any, i, remissivas) {
        return remissivas.indexOf(Any) === i;
      });
      console.log(remissivas);

      remSql += "INSERT INTO remissivas VALUES";
      for (var i = 0; i < remissivas.length; i++) {
        remSql += " ('" + termo + "', '" + remissivas[i] + "')" ;
        if (i < remissivas.length - 1 ) remSql += ', ';
      }
    }
  }

  console.log(remSql);
  db.query(sql, function(err, results) {
    console.log(err);
    if(err == null) {
       db.query(remDelete);
       if(remSql != '') db.query(remSql);
       db.query(sinDelete);
       if(sinSql != '') db.query(sinSql);
       messtatus = 'success';
       mes = 'Termo Editado com Sucesso.';
    }
    else if (err.code == 'ER_DUP_ENTRY') mes = 'Erro na Inserção. Termo já Inserido.';
    else if(err) mes = 'Erro na Alteração.';


        controller_termo.listarCategorias(function(err, resultsTermoCategorias) {
          controller_categoria.listar(function(err, resultsTodasCategorias) {
            controller_termo.listar(function(err, resultsTermo) {
              res.render('termo', {
                usuario: req.session.nome,
                permissao: req.session.permissao,
                message_status: messtatus,
                message: mes,
                scriptEdit: '',
                pesquisaTexto: '',
                dataTermo: '',
                dataTermos: resultsTermo,
                dataTodasCategorias: resultsTodasCategorias,
                dataCategorias: resultsTermoCategorias,
                dataRem: '',
                dataSin: ''
              });
            });
          });
        });
  });









  //
  // var sql = "UPDATE Tipo SET nome = '" + nome + "', descricao = '" + descricao + "' WHERE nome = '" + nomeAntigo + "'";
  // var messtatus = 'danger';
  // var mes;
  //
  // db.query(sql, function(err, results) {
  //   if(results.affectedRows > 0) {
  //     messtatus = 'success';
  //     mes = 'Categoria editada com Sucesso.';
  //   }
  //   else mes = 'Erro na Edição.';
  //
  //   controller_categoria.listar(function(err, resultsCategoria) {
  //     res.render('categoria', {
  //       usuario: req.session.nome,
  //       permissao: req.session.permissao,
  //       message_status: messtatus,
  //       message: mes,
  //       scriptEdit: '',
  //       dataCategoriaEdit: '',
  //       dataCategoriaRemove: '',
  //       dataCategoria: resultsCategoria
  //     });
  //   });
  // });
}
