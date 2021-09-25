const express = require("express");
const router = express.Router();
const async = require('async');
const db = require("../services/db");

router.get("/", async function (req, res) {
  try {
      let ans;
    db.connection.query(
      "select student_id as id, first_name as firstName, last_name as lastName, mobile from students;",
      function (err, rows, fields) {
        if (err) throw err;
        if (rows.length === 0) {
          res.send([]);
          return;
        }
        ans = [];
        async.each(rows, function (row, callback) {
          db.connection.query(
            "select skills.name as skills from skills left join students_skills_link on skills.skill_id = students_skills_link.skill_id where student_id = ?",
            row["id"],
            function (err, skill, fields) {
              for (j = 0; j < skill.length; j++) skill[j] = skill[j]["skills"];
              row["skills"] = skill.toString();
              row["mobile"] = String(row["mobile"])
                ans.push(row);
              callback();
            });
        }, ()=>res.send(ans));
      }
    );
  } catch (err) {
    console.error(`Error `, err.message);
    res.send("Error");
  }
});

module.exports = router;
