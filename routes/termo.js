var express = require('express');
var router = express.Router();

// Abre página de termos.
router.get('/', function(req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  }

  res.render('termo', {
    usuario: req.session.nome,
    permissao: req.session.permissao,
    message: ''
  });
});

module.exports = router;