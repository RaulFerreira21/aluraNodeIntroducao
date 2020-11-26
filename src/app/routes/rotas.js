const db = require('../../config/database');
const LivroDao = require('../infra/livro-dao');

module.exports = (app) => {
    app.get('/', function (req, resp) {
        resp.send(
            `<html>
                <head> 
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>Código bom, é código limpo</h1>
                </body>
            </html>
            `
        );
    });

    app.get('/livros/formulario/:id', function(req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);
    
        livroDao.buscaPorId(id)
            .then(livro => 
                resp.marko(
                    require('../views/livros/formulario/formulario.marko'),
                    { livro: livro }
                )
            )
            .catch(erro => console.log(erro));
    
    });

    app.get('/livros', function (res, resp) {

        const livroDao = new LivroDao(db);
        livroDao.listaLivros().then(livros => resp.marko(
            require('../views/livros/lista.marko'),
            {
                livros: livros
            }
        ))
        .catch(erro => console.log(erro));
    });

    app.get('/livros/form', function(res, resp) {
        resp.marko(require('../views/livros/formulario/formulario.marko'), {livro: {}});
    });

    app.post('/livros', function(req, resp) {
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
        .then(resp.redirect('/livros'))
        .catch(erro => console.log(erro));
    })

    app.put('/livros', function(req, resp) {
        console.log(req.body);
        const livroDao = new LivroDao(db);
        livroDao.atualiza(req.body)
        .then(resp.redirect('/livros'))
        .catch(erro => console.log(erro))
    })

    app.delete('/livros/:id', function(req,resp) {
        const id = req.params.id;

        const livroDao = new LivroDao(db);
        livroDao.remove(id).then(() => resp.status(200).end()).catch(erro => console.log(erro));
    })
};

