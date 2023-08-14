import { db } from "../database/database.connection.js";

export async function validateAuth(req, res, next) {
  console.log("aaaaaaaaaaaaaaa");

  const token = req.headers.authorization?.replace("Bearer ", "");
  console.log(token);
  if (!token) return res.status(401).send({ message: "Invalid token" });

  try {
    const session = await db.query(`SELECT * FROM sessions WHERE token=$1`, [token]);
    if (session.rowCount === 0) return res.status(401).send({ message: "Unauthorized" });

    res.locals.userId = session.rows[0].userId;

    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
