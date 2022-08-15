import multer from "multer";
import path from "path";
import fs from "fs";

export default class Multer {
  static upload(identifier) {
    return (req, res, next) => {
      const storage = multer.diskStorage({
        fileFilter: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          if (ext !== ".jpg" && ext !== "jpeg" && ext !== "png") {
            cb(
              new Error(
                "Les formats de fichiers autorisé sont jpg, jpeg et png"
              )
            );
          }
          cb(null, true);
        },
      });
      const upl = multer({ storage: storage }).single(identifier);
      upl(req, res, next, () => next());
    };
  }
}
