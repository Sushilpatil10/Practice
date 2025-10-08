

function authenticate(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("No token found");
  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch {
    res.status(403).send("Invalid or expired token");
  }
}
