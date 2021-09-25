const express = require("express");
const router = express.Router();
const db = require("../services/db");

router.post("/", async function (req, res) {
  try {
    db.connection.query(
      "SELECT password from users where email = ?", req.body.email,
      function (err, rows, fields) {
        if (err) throw err;
        if (rows.length === 0) {
          res.send("email")
        }
        else if (rows[0]["password"] !== req.body.password) {
          res.send("password")
        }
        else {
          res.send("success"); 
        }
      }
    );
  } catch (err) {
    console.error(`Error `, err.message);
    res.send("Error");
  }
});

module.exports = router;
