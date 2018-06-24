var express = require('express');
var router = express.Router();

// Obtem controllers
var controller_termo = require('../controllers/controller_termo');
var controller_categoria = require('../controllers/controller_categoria');

// Abre página de termos.
router.get('/', function(req, res, next) {
  if(req.session.usuario == null) {
    res.redirect("/usuario/login");
    return;
  }

  controller_termo.listarCategorias(function(err, resultsTermoCategorias) {
    controller_categoria.listar(function(err, resultsTodasCategorias) {
      controller_termo.listar(function(err, resultsTermo) {
        res.render('termo', {
          usuario: req.session.nome,
          permissao: req.session.permissao,
          message_status: '',
          message: '',
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

router.post('/cadastrar', controller_termo.cadastrar);
router.post('/pesquisar', controller_termo.pesquisar);
router.get('/exibir/:nome', controller_termo.exibir);

router.get('/edicao/:nome', controller_termo.edicao);
router.post('/editar', controller_termo.editar);
router.get('/remocao/:nome', controller_termo.remocao);
router.post('/remover', controller_termo.remover);

module.exports = router;
