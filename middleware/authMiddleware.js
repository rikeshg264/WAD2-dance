const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.session.token;
  if (!token) return res.redirect('/login');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.redirect('/login');

    req.user = decoded;
    next();
  });
}

module.exports = { verifyToken };
