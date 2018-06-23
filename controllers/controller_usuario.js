exports.login_post = function(req, res, next) {
    var post = req.body;
    var sess = req.session;
  
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