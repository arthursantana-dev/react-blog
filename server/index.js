const Database = require('./db.js')
const express = require('express')
const app = express()
const cors = require('cors')

const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(cors({origin: '*'}));

// app.use((req, res, next) => {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.header(
// 	  "Access-Control-Allow-Headers",
// 	  "Origin, X-Requested-With, Content-Type, Accept"
// 	);
// 	next();
//   });

app.listen(8080)

const db = new Database()

// db.getAllPosts()
//   .then(rows => {
//     console.log(rows);
//   })
//   .catch(error => {
//     console.error('Erro ao obter os posts:', error);
//   });

app.get('/all-posts', (req, res) => {
	db.getAllPosts()
	.then(rows => {
		res.json(rows)
	})
	.catch(error => {
		res.json(error)
	});
})

app.post('/post', (req, res) => {
	const body = req.body
	const title = "A"
	const content = "B"

	const result = db.addPost({title: title, content: content})

	console.log(`REQ.BODY: ${JSON.stringify(body)}`);
	res.send(req.body)
})