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
  
  res.render('cadastroUsuario', {
    usuario: req.session.nome,
    permissao: req.session.permissao
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

router.get('/perfil', function(req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  }
  
  res.render('perfil', {
    usuario: req.session.nome,
    permissao: req.session.permissao
  });
});

router.post('/logarUsuario', controller_usuario.login_post);

module.exports = router;
