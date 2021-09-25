const express = require("express");
const router = express.Router();
const db = require("../services/db");

router.post("/", async function (req, res, next) {
  try {
    let sql1 = "UPDATE users SET password=? WHERE email=?";
    db.connection.query(
      sql1,
      [req.body.newpass, req.body.email],

      (err, rows, fields) => {
        if (err) {
          console.log(err);
          throw err;
        }

       res.send(rows)
      }
    );

 

  } catch (err) {
    console.error(`Error `, err.message);
    next(err);
  }
});

module.exports = router;
