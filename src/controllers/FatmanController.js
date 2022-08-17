import db from "../Database.js";
import cloudinary from "../cloudinary.js";

export default class FatmanController {
  static async creerFatman(req, res) {
    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.image;

    const result = await cloudinary.uploader.upload(req.file.path);
    db.query(
      "INSERT INTO Fatman (name, description, image, cloudinary_id) VALUES (?,?,?,?)",
      [name, description, result.secure_url, result.public_id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send("C'est en base");
        }
      }
    );
  }

  static async lesFatmen(req, res) {
    db.query("SELECT * from Fatman;", (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    });
  }

  static async leFatman(req, res) {
    const id = req.params.id;
    db.query(
      "SELECT * from Fatman where idFatman = ?",
      [id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send(results);
        }
      }
    );
  }

  static async updateFatman(req, res) {
    const id = req.params.id;

    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.image;

    db.query(
      "SELECT * from Fatman where idFatman = ?",
      [id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          cloudinary.v2.uploader.destroy(results[0].cloudinary_id);
        }
      }
    );

    const result = await cloudinary.uploader.upload(req.file.path);

    db.query(
      "UPDATE Fatman SET name = ?, description = ?, image = ?, cloudinary_id = ? where idFatman = ?",
      [name, description, result.secure_url, result.public_id, id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send("L'update à été effectué");
        }
      }
    );
  }

  static async updateFatmanSansImage(req, res) {
    const id = req.params.id;

    const name = req.body.name;
    const description = req.body.description;

    db.query(
      "UPDATE Fatman SET name = ?, description = ? where idFatman = ?",
      [name, description, id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send(results);
        }
      }
    );
  }

  static async deleteFatman(req, res) {
    const id = req.params.id;

    db.query(
      "SELECT * from Fatman where idFatman = ? ;",
      [id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          cloudinary.v2.uploader.destroy(
            results[0].cloudinary_id,
            function (result) {
              res.send(result);
            }
          );
        }
      }
    );

    db.query(
      "DELETE from Fatman where idFatman = ? ;",
      [id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Supprimé");
        }
      }
    );
  }
}
