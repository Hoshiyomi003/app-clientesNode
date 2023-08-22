import { pool } from "../../database/db.js";

export const renderCustomers = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener la conexión a la base de datos");
      return;
    }

    connection.query("SELECT * FROM clientes", (err, rows) => {
      connection.release(); // Libera la conexión

      if (err) {
        console.error(err);
        res.status(500).send("Error al obtener los clientes");
        return;
      }

      res.render("customers", { customers: rows });
    });
  });
};

export const createCustomers = (req, res) => {
  const newCustomer = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener la conexión a la base de datos");
      return;
    }

    connection.query("INSERT INTO clientes SET ?", [newCustomer], (err) => {
      connection.release(); // Libera la conexión

      if (err) {
        console.error(err);
        res.status(500).send("Error al crear el cliente");
        return;
      }

      res.redirect("/");
    });
  });
};

export const editCustomer = (req, res) => {
  const { id } = req.params;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener la conexión a la base de datos");
      return;
    }

    connection.query("SELECT * FROM clientes WHERE id = ?", [id], (err, result) => {
      connection.release(); // Libera la conexión

      if (err) {
        console.error(err);
        res.status(500).send("Error al obtener el cliente");
        return;
      }

      res.render("customers_edit", { customer: result[0] });
    });
  });
};

export const updateCustomer = (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener la conexión a la base de datos");
      return;
    }

    connection.query("UPDATE clientes SET ? WHERE id = ?", [newCustomer, id], (err) => {
      connection.release(); // Libera la conexión

      if (err) {
        console.error(err);
        res.status(500).send("Error al actualizar el cliente");
        return;
      }

      res.redirect("/");
    });
  });
};

export const deleteCustomer = (req, res) => {
  const { id } = req.params;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener la conexión a la base de datos");
      return;
    }

    connection.query("DELETE FROM clientes WHERE id = ?", [id], (err, result) => {
      connection.release(); // Libera la conexión

      if (err) {
        console.error(err);
        res.status(500).send("Error al eliminar el cliente");
        return;
      }

      if (result.affectedRows === 1) {
        res.json({ message: "Cliente eliminado" });
      } else {
        res.json({ message: "Cliente no encontrado" });
      }

      res.redirect("/");
    });
  });
};



