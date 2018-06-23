var express = require('express');
var router = express.Router();

// Obtem controllers
controller_usuario = require('../controllers/controller_usuario');

// Abre página de gerenciamento de usuários.
router.get('/cadastro', function(req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  } else if(req.session.permissao == 0) {
    res.redirect("/");
    return;
  }

  controller_usuario.listar(function(err, resultsUsuario) {
    res.render('cadastroUsuario', {
      usuario: req.session.nome,
      permissao: req.session.permissao,
      message_status: '',
      message: '',
      scriptEdit: '',
      dataAdminRemove: '',
      dataUsuario: resultsUsuario
    });
  });
});

// Abre página de login.
router.get('/login', function(req, res, next) {
  res.render('login', {
    message: ''
  });
});

// Faz o logout do sistema.
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    res.redirect("/usuario/login");
  });
});

// Abre tela de Perfil do usuário.
router.get('/perfil', function(req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  }

  controller_usuario.listarPerfil(function(err, resultsUsuario) {
    res.render('perfil', {
      usuario: sess.nome,
      permissao: sess.permissao,
      message_status: '',
      message: '',
      scriptEdit: '',
      dataAdminSenha: '',
      dataUsuario: resultsUsuario
    });
  });
});

router.post('/cadastrar', controller_usuario.cadastrar);
router.post('/logarUsuario', controller_usuario.login);

router.get('/remocao/:login', controller_usuario.remocao);
router.post('/remover', controller_usuario.remover);

router.get('/promover/:login', controller_usuario.promover);
router.get('/rebaixar/:login', controller_usuario.rebaixar);

router.post('/editar', controller_usuario.editar);

router.post('/alteracaoSenha', controller_usuario.alteracaoSenha);
router.post('/alterarSenha', controller_usuario.alterarSenha);

module.exports = router;
