const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')

require('dotenv').config();

const rotaCnae = require('./routes/cnae')
const rotaDocumento = require('./routes/documento')
const rotaEmpresa = require('./routes/empresa')
const rotaNivel = require('./routes/nivel')
const rotaTipo = require('./routes/tipo')
const rotaUsuario = require('./routes/usuarios')
const rotaLogin = require('./routes/login')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Credentials", "true")
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS')
        return res.status(200).send({})
    }
    next();
})

app.use('/cnae', rotaCnae);
app.use('/documento', rotaDocumento);
app.use('/empresa', rotaEmpresa);
app.use('/nivel', rotaNivel);
app.use('/tipo', rotaTipo);
app.use('/usuario', rotaUsuario);
app.use('/login', rotaLogin);


app.get('/api/test', (req,res) => {
    res.status(200).json({message: 'OK'})
})

app.use(express.static('public'))

app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.mensagem
        }
    })
});

module.exports = app;