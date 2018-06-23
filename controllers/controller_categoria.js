var controller_categoria = require('./controller_categoria');

exports.listar = function (callback) {
  var sql = "SELECT * FROM Tipo";

  db.query(sql, callback);
};

exports.cadastrar = function(req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  }

  var post  = req.body;

  var sql = "INSERT INTO tipo SET nome = '" + post.nome + "', descricao = '" + post.descricao + "'";
  var messtatus = 'danger';
  var mes;

  db.query(sql, function(err, result) {
    if(err == null) {
      messtatus = 'success';
      mes = 'Categoria Inserida com Sucesso.';
    }
    else if (err.code == 'ER_DUP_ENTRY') mes = 'Erro na Inserção. Usuário já Inserido.';
    else if(err) mes = 'Erro na Inserção.';

    controller_categoria.listar(function(err, resultsCategoria) {
      res.render('categoria', {
        usuario: req.session.nome,
        permissao: req.session.permissao,
        message_status: messtatus,
        message: mes,
        scriptEdit: '',
        dataCategoriaEdit: '',
        dataCategoria: resultsCategoria
      });
    });
  });
};

exports.remocao = function(req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  }

  var nome  = req.params.nome;

  var sql = "SELECT * FROM Tipo where nome = '" + nome + "'";

  controller_categoria.listar(function(err, resultsCategoria) {
    db.query(sql, function(err, results) {
      res.render('categoria', {
        usuario: req.session.nome,
        permissao: req.session.permissao,
        message_status: '',
        message: '',
        scriptEdit: '#removeCategoria',
        dataCategoriaEdit: '',
        dataCategoriaRemove: results,
        dataCategoria: resultsCategoria
      });
    });
  });
};

exports.remover = function(req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  }

  var nome = req.body.nome;

  var sql = "DELETE FROM Tipo WHERE nome = '" + nome + "'";
  var messtatus = 'danger';
  var mes;

  db.query(sql, function (err, result) {
    if(err == null) {
      messtatus = 'success';
      mes = 'Categoria Apagada com Sucesso.';
    }
    else if(err) mes = 'Erro na Remoção.';

    controller_categoria.listar(function(err, resultsCategoria) {
      res.render('categoria', {
        usuario: req.session.nome,
        permissao: req.session.permissao,
        message_status: messtatus,
        message: mes,
        scriptEdit: '',
        dataCategoriaEdit: '',
        dataCategoriaRemove: '',
        dataCategoria: resultsCategoria
      });
    });
  });
};

exports.edicao = function(req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  }

  var nome = req.params.nome;

  var sql = "SELECT * FROM Tipo where nome = '" + nome + "'";

  controller_categoria.listar(function(err, resultsCategoria) {
    db.query(sql, function(err, results) {
      res.render('categoria', {
        usuario: req.session.nome,
        permissao: req.session.permissao,
        message_status: '',
        message: '',
        scriptEdit: '#editCategoria',
        dataCategoriaEdit: results,
        dataCategoriaRemove: '',
        dataCategoria: resultsCategoria
      });
    });
  });
};

exports.editar = function(req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  }

  var post = req.body;

  var nome = post.nome;
  var nomeAntigo = post.nomeAntigo;
  var descricao = post.descricao;

  var sql = "UPDATE Tipo SET nome = '" + nome + "', descricao = '" + descricao + "' WHERE nome = '" + nomeAntigo + "'";
  var messtatus = 'danger';
  var mes;

  db.query(sql, function(err, results) {
    if(results.affectedRows > 0) {
      messtatus = 'success';
      mes = 'Categoria editada com Sucesso.';
    }
    else mes = 'Erro na Edição.';

    controller_categoria.listar(function(err, resultsCategoria) {
      res.render('categoria', {
        usuario: req.session.nome,
        permissao: req.session.permissao,
        message_status: messtatus,
        message: mes,
        scriptEdit: '',
        dataCategoriaEdit: '',
        dataCategoriaRemove: '',
        dataCategoria: resultsCategoria
      });
    });
  });
};
