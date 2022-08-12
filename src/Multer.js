import multer from "multer";
import path from "path";
import fs from "fs";

export default class Multer {
  static upload(uploadPath, identifier) {
    return (req, res, next) => {
      const MIME_TYPES = {
        "image/jpg": "jpg",
        "image/jpeg": "jpg",
        "image/png": "png",
      };

      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          if (!fs.existsSync(`./images`)) fs.mkdirSync(`./images/`);
          if (!fs.existsSync(`./images/${uploadPath}`))
            fs.mkdirSync(`./images/${uploadPath}`);
          cb(null, `./images/${uploadPath}`);
        },
        filename: (req, file, cb) => {
          const name = file.originalname.split(" ").join("_");
          const extension = MIME_TYPES[file.mimetype];
          req.body[identifier] = `./images/${uploadPath}/${
            Date.now() + "." + extension
          }`;
          cb(null, Date.now() + "." + extension);
        },
      });

      const upl = multer({ storage: storage }).single(identifier);
      upl(req, res, next, () => next());
    };
  }
}
