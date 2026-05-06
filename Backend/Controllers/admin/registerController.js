import pool from "../../Servers/database.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  switch (req.body.role) {
    case "admin":
      {
        const { name, email, password, contact } = req.body;
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = await pool.query(
            "INSERT INTO users(full_name,email,password,role,phone) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [name, email, hashedPassword, "admin", contact],
          );
          res.status(201).json({
            message: "Admin registered successfully",
            user: newUser.rows[0],
          });
        } catch (error) {
          console.error("Error registering admin:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      }
      break;

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
          address,
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
            "INSERT INTO patients(user_id,gender,date_of_birth,insurance_provider,insurance_num,address) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [newUser.rows[0].id, gender, birth, provider, num, address],
          );
          await client.query("COMMIT");

          res.status(201).json({
            message: "successful",
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
      const {
        name,
        gender,
        birth,
        id,
        years,
        email,
        password,
        role,
        contact,
        department,
      } = req.body;

      console.log(req.files);
      const photo = req.files?.photo?.[0];
      const credentials = req.files?.credentials?.[0];
      const credentialsPath = credentials ? credentials.path : null;
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await client.query(
          "INSERT INTO users(full_name,email,password,role,phone,profile_Image) VALUES($1, $2, $3, $4, $5,$6) RETURNING *",
          [
            name,
            email,
            hashedPassword,
            role,
            contact,
            photo ? photo.path : null,
          ],
        );
        const newNurse = await client.query(
          "INSERT INTO nurses(user_id,departments,certificates) VALUES($1, $2 ,$3) RETURNING *",
          [newUser.rows[0].id, department, credentialsPath],
        );
        await client.query("COMMIT");
        res.status(201).json({
          message: "successful",
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
