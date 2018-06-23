var express = require('express');
var router = express.Router();

// Obtem controllers
var controller_categoria = require('../controllers/controller_categoria');

// Abre página de categorias.
router.get('/', function(req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  }

  controller_categoria.listar(function(err, resultsCategoria) {
    res.render('categoria', {
      usuario: req.session.nome,
      permissao: req.session.permissao,
      message_status: '',
      message: '',
      scriptEdit: '',
      dataCategoriaEdit: '',
      dataCategoriaRemove: '',
      dataCategoria: resultsCategoria
    });
  });
});

router.post('/cadastrar', controller_categoria.cadastrar);
router.get('/remocao/:nome', controller_categoria.remocao);
router.post('/remover', controller_categoria.remover);
router.get('/edicao/:nome', controller_categoria.edicao);
router.post('/editar', controller_categoria.editar);

module.exports = router;
