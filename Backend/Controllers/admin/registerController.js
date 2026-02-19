import pool from "../../Servers/database.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  switch (req.body.role) {
    case "patient":
      {
        const {
          name,
          gender,
          birth,
          id,
          contact,
          email,
          provider,
          num,
          password,
        } = req.body;
        const client = await pool.connect();
        try {
          await client.query("BEGIN");
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = await client.query(
            "INSERT INTO users(full_name,email,password,role,phone) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [name, email, hashedPassword, "patient", contact],
          );

          const newPatient = await client.query(
            "INSERT INTO patients(user_id,gender,date_of_birth,insurance_provider,insurance_number) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [newUser.rows[0].id, gender, birth, provider, num],
          );
          await client.query("COMMIT");

          res
            .status(201)
            .json({
              message: "User registered successfully",
              user: newUser.rows[0],
            });
        } catch (error) {
          await client.query("ROLLBACK");
          console.error("Error registering user:", error);
          res.status(500).json({ error: "Internal server error" });
        } finally {
          client.release();
        }
      }
      break;
    case "nurse": {
      const { name, email, password, role, contact, department } = req.body;
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await client.query(
          "INSERT INTO users(full_name,email,password,role,phone) VALUES($1, $2, $3, $4, $5) RETURNING *",
          [name, email, hashedPassword, role, contact],
        );
        const newNurse = await client.query(
          "INSERT INTO nurses(user_id,assigned_wards) VALUES($1, $2) RETURNING *",
          [newUser.rows[0].id, department],
        );
        await client.query("COMMIT");
        res
          .status(201)
          .json({
            message: "Nurse registered successfully",
            user: newUser.rows[0],
          });
      } catch (error) {
        await client.query("ROLLBACK");
        console.error("Error registering nurse:", error);
        res.status(500).json({ error: "Internal server error" });
      } finally {
        client.release();
      }
    }
  }
};
