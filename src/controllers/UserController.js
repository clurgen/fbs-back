import db from "../Database.js";
import bcrypt from "bcrypt";
import Jwt from "../jwt";

export default class UserController {
  static async inscription(req, res) {
    const pseudo = req.body.pseudo;
    const mail = req.body.mail;
    const password = req.body.password;
    const type = req.body.type;
    const photo = req.body.photo;

    bcrypt
      .hash(password, 10)
      .then((hash) => {
        db.query(
          "INSERT INTO Users (pseudo, mail, password, type, photo) VALUES (?,?,?,?,?)",
          [pseudo, mail, hash, type, photo]
        );
      })
      .then(() => {
        res.json("Bienvenue !");
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({ error: err });
        }
      });
  }

  static async connexion(req, res) {
    const pseudo = req.body.pseudo;
    const mail = req.body.mail;
    const password = req.body.password;
    const type = req.body.type;
    const photo = req.body.photo;
    let status = 200;
    let body = {};

    db.query(
      "SELECT * FROM users where mail = ?",
      [mail],
      async function (err, result, fields) {
        if (err) throw err;
        const user = Object.values(JSON.parse(JSON.stringify(result)));
        if (!user) res.status(400).json("Cet utilisateur n'existe pas");
        const dbPassword = await user[0].password;

        const comparePassword = await bcrypt.compare(password, dbPassword);
        console.log(comparePassword);
        try {
          if (comparePassword) {
            const accessToken = Jwt.createTokens(user[0]);

            res.cookie("accses-token", accessToken, {
              maxAge: 60 * 60 * 24 * 30 * 100,
              httpOnly: true,
            });
            body = { user, accessToken };
            res.json("Connecté");
          } else {
            res.status(400).json({ error: "Mot de passe érroné" });
          }
        } catch (err) {
          console.error(err);
          res.status(500).send();
        }
        res.status(status).json(body);
      }
    );
  }
}
