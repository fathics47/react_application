const path = require('path')
const db = require("./db");
const async = require("async");
const fs = require("fs");

const AddStudent = (data, files, dir, res) => {

    var skills = JSON.parse(data['skills']).map((obj, i) => {
        return obj.value
    })

    var create_done = false

    // db.connection.connect();
    
    var create_student = () => {
        var params = {
            first_name: data['first_name'],
            last_name: data['last_name'],
            mobile: data['mobile'],
            email: data['email'],
            gender: data['gender'],
            dob: data['dob'],
            qualification: data['qualification'],
            description: data['description'],
            profile_img: fs.readFileSync(dir+"/static/assets/uploads/" + files[0].filename)
        }
    
        var query = "insert into `students` SET ? "

        return new Promise(function(resolve, reject){
            db.connection.query(query, params, function(err, result){
                
                var student_id;
                if(err){
                    console.log(err.message)
                    return reject(err.message)
                }
                else{
                    student_id = result.insertId
                    console.log('Student created')
                    resolve(student_id)
                }
            })
        })
    }

    var get_skill_id = () => {
        var list = JSON.stringify(skills).slice(1,-1);

        var query = 'select `skill_id` from skills where `name` in ('+list+');'
        
        return new Promise(function(resolve, reject){
            db.connection.query(query, function(err, rows){
                if(err){
                    console.log(err.message)
                    reject(err.message)
                }
                else{
                    resolve(rows)
                }
            })
        })
    }

    create_student().then((student_id)=>{
        var query = 'insert into `students_skills_link` set ? '
        get_skill_id()
        .then(ids => {
            async.each(ids,
                function (obj, callback) {
                    var params = {
                      student_id: student_id,
                      skill_id: obj.skill_id,
                    };
                    db.connection.query(query, params, function (err, result) {
                      if (err) {
                        console.log(err.message);
                      } else {
                        console.log("Inserted");
                        }
                        callback();
                    });
                }, () => res.send("success"))
        })
            .catch(err => {
                console.log(err)
                res.send("failure");
            })
    })
        .catch(err => {
            console.log(err)
            res.send("failure");
        })
    // db.connection.end()
}

module.exports = {
    AddStudent
}