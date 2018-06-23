var controller_usuario = require('./controller_usuario');

exports.login = function(req, res, next) {
  var post = req.body;
  global.sess = req.session;

  var sql = "SELECT * FROM admin WHERE login = '" + post.usuario + "' and senha = '" + post.senha + "'";

  db.query(sql, function(err, results) {
    if(results.length) {
      sess.nome = results[0].nome;
      sess.usuario = results[0].login;
      sess.permissao = results[0].fodao;
      console.log("Bem Vindo", sess.nome);

      res.redirect('/');
    } else {
      res.render('login', {
        message: 'Credenciais Erradas'
      });
    }
  });
};

exports.listar = function (callback) {
  var login = sess.usuario;

  var sql = "SELECT * FROM admin WHERE login != '" + login + "'";

  db.query(sql, callback);
};

exports.listarPerfil = function (callback) {
  var login = sess.usuario;

  var sql = "SELECT * FROM admin WHERE login = '" + login + "'";

  db.query(sql, callback);
};

exports.cadastrar = function (req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  } else if(req.session.permissao == 0) {
    res.redirect("/");
    return;
  }

  var post = req.body;
  var fodao;

  if (post.permissao == 'on') fodao = 1;
  else fodao = 0;

  var sql = "INSERT INTO admin SET nome = '" + post.nome + "', login = '" + post.usuario + "', senha = '" + post.senha + "', fodao = " + fodao;
  var messtatus = 'danger';
  var mes;

  db.query(sql, function(err, result) {
    if(err == null) {
      messtatus = 'success';
      mes = 'Administrador Inserida com Sucesso.';
    }
    else if (err.code == 'ER_DUP_ENTRY') mes = 'Erro na Inserção. Administrador já Inserido.';
    else if(err) mes = 'Erro na Inserção.';

    controller_usuario.listar(function(err, resultsUsuario) {
      res.render('cadastroUsuario', {
        usuario: req.session.nome,
        permissao: req.session.permissao,
        message_status: messtatus,
        message: mes,
        scriptEdit: '',
        dataAdminRemove: '',
        dataUsuario: resultsUsuario
      });
    });
  });
};

exports.promover = function (req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  } else if(req.session.permissao == 0) {
    res.redirect("/");
    return;
  }

  var login = req.params.login;

  var sql = "UPDATE admin SET fodao = 1 WHERE login = '" + login + "'";
  var messtatus = 'danger';
  var mes;

  db.query(sql, function(err, results) {
    if(results.affectedRows > 0) {
      messtatus = 'success';
      mes = 'Administrador Promovido com Sucesso.';
    }
    else mes = 'Erro na Promoção.';

    controller_usuario.listar(function(err, resultsUsuario) {
      res.render('cadastroUsuario', {
        usuario: req.session.nome,
        permissao: req.session.permissao,
        message_status: mes,
        message: messtatus,
        scriptEdit: '',
        dataAdminRemove: '',
        dataUsuario: resultsUsuario
      });
    });
  });
};

exports.rebaixar = function (req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  } else if(req.session.permissao == 0) {
    res.redirect("/");
    return;
  }

  var login = req.params.login;

  var sql = "UPDATE admin SET fodao = 0 WHERE login = '" + login + "'";
  var messtatus = 'danger';
  var mes;

  db.query(sql, function(err, results) {
    if(results.affectedRows > 0) {
      messtatus = 'success';
      mes = 'Administrador Rebaixado com Sucesso.';
    }
    else mes = 'Erro ao Rebaixar Administrador.';

    controller_usuario.listar(function(err, resultsUsuario) {
      res.render('cadastroUsuario', {
        usuario: req.session.nome,
        permissao: req.session.permissao,
        message_status: mes,
        message: messtatus,
        scriptEdit: '',
        dataAdminRemove: '',
        dataUsuario: resultsUsuario
      });
    });
  });
};

exports.remocao = function(req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  } else if(req.session.permissao == 0) {
    res.redirect("/");
    return;
  }

  var login  = req.params.login;

  var sql = "SELECT * FROM admin where login = '" + login + "'";

  controller_usuario.listar(function(err, resultsUsuario) {
    db.query(sql, function(err, results) {
      res.render('cadastroUsuario', {
        usuario: req.session.nome,
        permissao: req.session.permissao,
        message_status: '',
        message: '',
        scriptEdit: '#removeAdmin',
        dataAdminRemove: results,
        dataUsuario: resultsUsuario
      });
    });
  });
};

exports.remover = function (req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  } else if(req.session.permissao == 0) {
    res.redirect("/");
    return;
  }

  var login = req.body.login;

  var sql = "DELETE FROM admin WHERE login = '" + login + "'";
  var messtatus = 'danger';
  var mes;

  db.query(sql, function (err, result) {
    if(err == null) {
      messtatus = 'success';
      mes = 'Administrador Apagado com Sucesso.';
    }
    else if(err) mes = 'Erro na Remoção.';

    controller_usuario.listar(function(err, resultsUsuario) {
      res.render('cadastroUsuario', {
        usuario: req.session.nome,
        permissao: req.session.permissao,
        message_status: mes,
        message: messtatus,
        scriptEdit: '',
        dataAdminRemove: '',
        dataUsuario: resultsUsuario
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

  var login = post.usuario;
  var loginAntigo = post.usuarioAntigo;
  var nome = post.nome;

  var sql = "UPDATE admin SET nome = '" + nome + "', login = '" + login + "' WHERE login = '" + loginAntigo + "'";
  var messtatus = 'danger';
  var mes;

  db.query(sql, function(err, results) {
    if(results.affectedRows > 0) {
      messtatus = 'success';
      mes = 'Administrador editado com Sucesso.';
      sess.usuario = login;
      sess.nome = nome;
    }
    else mes = 'Erro na Edição.';

    controller_usuario.listarPerfil(function(err, resultsUsuario) {
      res.render('perfil', {
        usuario: sess.nome,
        permissao: sess.permissao,
        message_status: messtatus,
        message: mes,
        scriptEdit: '',
        dataAdminSenha: '',
        dataUsuario: resultsUsuario
      });
    });
  });
};

exports.alteracaoSenha = function(req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  }

  var post = req.body;

  var login = post.usuario;
  var senhaAntiga = post.senhaAntiga;
  var senhaNova1 = post.senhaNova1;
  var senhaNova2 = post.senhaNova2;

  var messtatus = 'danger';
  var mes ;

  var sql = "SELECT * FROM Admin WHERE login = '" + login + "'";

  db.query(sql, function(err, results) {
    if (results[0].senha != senhaAntiga) {
      mes = 'Senha errada';
    }
    else if (senhaNova1 != senhaNova2) {
      mes = 'Senhas diferentes';
    }
    else {
      controller_usuario.listarPerfil(function(err, resultsUsuario) {
        res.render('perfil', {
          usuario: sess.nome,
          permissao: sess.permissao,
          message_status: '',
          message: '',
          scriptEdit: '#alteraSenha',
          dataAdminSenha: results,
          dataUsuario: resultsUsuario
        });
      });
    }

    controller_usuario.listarPerfil(function(err, resultsUsuario) {
      res.render('perfil', {
        usuario: sess.nome,
        permissao: sess.permissao,
        message_status: messtatus,
        message: mes,
        scriptEdit: '',
        dataAdminSenha: '',
        dataUsuario: resultsUsuario
      });
    });
  });
};

exports.alterarSenha = function(req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  }

  var post = req.body;

  var login = post.usuario;
  var senha = post.senha;

  var sql = "UPDATE Admin SET senha = '" + senha + "' WHERE login = '" + login + "'";
  var messtatus = 'danger';
  var mes;

  db.query(sql, function(err, results) {
    if(results.affectedRows > 0) {
      messtatus = 'success';
      mes = 'Senha Alterada com Sucesso.';
    }
    else mes = 'Erro na Alteração.';

    controller_usuario.listarPerfil(function(err, resultsUsuario) {
      res.render('perfil', {
        usuario: sess.nome,
        permissao: sess.permissao,
        message_status: messtatus,
        message: mes,
        scriptEdit: '',
        dataAdminSenha: '',
        dataUsuario: resultsUsuario
      });
    });
  });
};
