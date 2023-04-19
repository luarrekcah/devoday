const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({path:'./.env'});

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

db.connect( (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Mysql conectado!')
    }
});

// Definindo rotas
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))
app.use('/criar', require('./routes/auth'))

app.listen(3000, () => {
    console.log("Servidor ligado")
})

/*
POST => inserir
GET => Buscar um/mais
PUT => alterar
DELETE => remover
*/

/* const nodemailer = require('nodemailer');
const usuario = "devodaysuporte@gmail.com"
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: usuario,
        pass: process.env.EMAILS
    }
})

let texto = `Olá, agradecemos pelo seu feedback e iremos verificar. Seu texto foi: ${txt}`

transporter.sendMail({
    from: usuario,
    to: [usuario, email],
    subject: "Feedback",
    text: texto
}).then(info => {
    console.log(info)
}).catch(error => {
    console.log(error)
}) */