const express = require("express");
const router = express.Router();
const db = require("../services/db");

router.post("/", async function (req, res) {
  try {
    const id = req.body.id;
      const sql1 = "delete from students_skills_link where student_id = ?",
          sql2 = "delete from students where student_id = ?";
    db.connection.query(
      sql1, id,
      async function(err, rows, fields){
        if (err) {
          console.log(err);
          throw err;
        }
          async function del() {
              db.connection.query(sql2, id, (err, rows) => { if (err) {
                console.log(err);
                throw err;
              }});
          }
          await del();
          res.send("sucess");
      }
    );
  } catch (err) {
      console.error(`Error `, err.message);
      res.send("fail")
  }
});

module.exports = router;
