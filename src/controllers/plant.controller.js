import { db } from "../database/database.connection.js";

export async function getAllPlants(_, res) {
  try {
    const plants = await db.query("SELECT * FROM plants");
    res.status(200).send(plants.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function BuyPlant(req, res) {
  const { id } = req.body;

  try {
    const plants = await db.query(`SELECT "userId" FROM plants WHERE id=$1;`, [id]);
    if (plants.rowCount === 0) return res.status(404).send({ message: "Plant not found" });

    await db.query(`DELETE FROM plants WHERE id=$1`, [id]);
    res.sendStatus(204);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getMyplants(req, res) {
  const { userId } = res.locals;

  try {
    const MyplantsQuery = await db.query(`SELECT * FROM plants WHERE "userId" = $1;`, [userId]);
    res.send(MyplantsQuery.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function addPlant(req, res) {
  const { isAvailable, typeId, plantName, image, price } = req.body;
  const { userId } = res.locals;

  try {
    await db.query(`INSERT INTO plants ("userId", "isAvailable", "typeId", "plantName", image, price) VALUES ($1, $2, $3, $4, $5, $6)`, [
      userId,
      isAvailable,
      typeId,
      plantName,
      image,
      price,
    ]);
    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function editPlant(req, res) {
  const { userId } = res.locals;
  const { id } = req.body;

  try {
    const plantQuery = `
      SELECT * FROM plants
      WHERE "id" = $1 AND "userId" = $2;
    `;

    const plantResult = await db.query(plantQuery, [id, userId]);

    if (plantResult.rows.length === 0) {
      return res.status(404).send({ message: "Planta não encontrada para o usuário atual." });
    }

    const currentAvailability = plantResult.rows[0].isAvailable;
    const newAvailability = !currentAvailability;

    const updateQuery = `
      UPDATE plants
      SET "isAvailable" = $1
      WHERE "id" = $2 AND "userId" = $3;
    `;

    await db.query(updateQuery, [newAvailability, id, userId]);

    res.send({ message: "Status de disponibilidade da planta atualizado com sucesso." });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
