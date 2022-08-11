import jsonwebtoken from "jsonwebtoken";

export default class Auth {
  /**
   * Check if user is right to access routes
   * @param roles
   * @returns {function(...[*]=)}
   */
  static isAllowed(type) {
    return async (req, res, next) => {
      try {
        let token = req.headers.authorization.replace(/Bearer /g, "");
        let decryptToken = jsonwebtoken.decode(token, process.env.JWT_SECRET);
        let user = db.query(
          "SELECT * from users where idUser = ?",
          [decryptToken],
          (err, results) => {
            if (err) {
              console.log(err);
            } else {
              res.json(results);
            }
          }
        );

        if (type.includes(user.type)) {
          next();
        } else {
          return res.status(401).json({ message: "Unauthorized" });
        }
      } catch (e) {
        return res.status(403).json({ message: "Missing token" });
      }
    };
  }
}
