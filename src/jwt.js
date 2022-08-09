import jsonwebtoken from "jsonwebtoken";

export default class Jwt {
  static createTokens = (user) => {
    const accessToken = jsonwebtoken.sign(
      { username: user.mail, id: user.idUser },
      process.env.JWT_SECRET
    );
    return accessToken;
  };

  static validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    if (!accessToken)
      return res.status(400).json({ error: "User not Authenticated !" });
    try {
      const valideToken = jsonwebtoken.verify(
        accessToken,
        process.env.JWT_SECRET
      );
      if (validToken) {
        req.authenticated = true;
        return next();
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  };
}
