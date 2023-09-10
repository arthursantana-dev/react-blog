class Database {
	constructor(){
		const mysql = require('mysql2')

		this.connection = mysql.createConnection({
			host: 'localhost',
			password: 'rootetec*2DS',
			database: 'react_blog_db',
			user: 'root'
		})

		this.connection.connect(err => {
			if (err) {console.log(err)} else console.log('Conectado ao banco');
		})

	}


	addPost({title, content}) {
		const sql = `INSERT INTO post (title, content) VALUES ("${title}", "${content}");`
		this.connection.query(sql, (err, result) => {
			if (err) throw err
		})

		// console.log("INSERT: " + rows);
	}
	
	removePost(postId) {
		const sql = `DELETE FROM post WHERE id=${postId}`
		this.connection.query(sql, result => {
			console.log(result);
		})
	}

	getAllPosts() {
		const sql = "SELECT * FROM post";
	  
		return new Promise((resolve, reject) => {
		  this.connection.query(sql, (err, result, fields) => {
			if (err) {
			  reject(err); // Rejeita a Promise em caso de erro
			} else {
			  resolve(result); // Resolve a Promise com o resultado
			}
		  });
		});
	  }

	truncate(){
		const sql = "TRUNCATE TABLE post"
		this.connection.query(sql, err => {
			if (err) console.log(err);
		})
	}
	  
}

const db = new Database()

// db.addPost({ title: 'As Aventuras do Viajante do Tempo', content: 'Hoje, viajei de volta ao passado e conheci Leonardo da Vinci.' });
// db.addPost({ title: 'Receita de Bolo de Chocolate Perfeito', content: 'Este bolo é tão incrivelmente fofo e saboroso que todos vão pedir a receita.' });
// db.addPost({ title: 'Segredos da Natureza: O Canto dos Pássaros', content: 'Descobri o significado por trás dos belos cantos matinais dos pássaros.' });
// db.addPost({ title: 'Minha Jornada para Conquistar o Everest', content: 'Uma emocionante narrativa da minha escalada até o pico mais alto do mundo.' });
// db.addPost({ title: 'O Dia em que Encontrei um Tesouro Perdido', content: 'Uma história incrível sobre como tropecei em um mapa do tesouro antigo.' });

// db.truncate()

module.exports = Database