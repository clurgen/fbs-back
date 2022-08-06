const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: "",
    database: 'fbs',
})

app.post('/createArticle', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const nbEpisodes = req.body.nbEpisodes;
    const nbSaison = req.body.nbSaison;
    const episode = req.body.episode;
    const avis = req.body.avis;
    const image = req.body.image;
    const urlVideo = req.body.video;
    const playlist = req.body.playlist;

    db.query(
        'INSERT INTO Article (name, description, nbEpisode, nbSaison, episode, avis, image, urlVideo, playlist) VALUES (?,?,?,?,?,?,?,?,?)', 
        [name, description, nbEpisodes, nbSaison, episode, avis, image, urlVideo, playlist], 
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("C'est en base");
            }
        })
})


app.get('/getArticles', (req, res) => {
    db.query(
        'SELECT * from Article;', (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send(results);
            }
        })
})


app.get('/getArticleById/:id', (req, res) => {
    

    id = req.params.id;
    db.query(
        'SELECT * from Article where idArticle = ?',[id], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send(results);
            }
        })
})

app.listen(3001,() => {
    console.log("Yey, your server is running on port 3001");
})
