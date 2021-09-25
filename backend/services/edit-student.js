const path = require('path')
const db = require("./db");
const fs = require("fs");

const EditStudent = async (data, files, dir, id) => {

    var skills = JSON.parse(data['skills']).map((obj, i) => {
        return obj.value
    })

    var edit_student = () => {
        var params = {
          first_name: data["first_name"],
          last_name: data["last_name"],
          mobile: data["mobile"],
          email: data["email"],
          gender: data["gender"],
          qualification: data["qualification"],
          description: data["description"],
        };
        
        if (data['dob']) {
            params = {
              ...params,
              dob: data["dob"],
            };
        }
        if(files.length > 0){
            params['profile_img'] = fs.readFileSync(dir+"/static/assets/uploads/" + files[0].filename)
        }

        var query =
        `
        update students
        set ?
        where student_id = ${id}
        `

        return new Promise(function(resolve, reject){
            db.connection.query(query, params, function(err, result){
                if(err){
                    console.log(err.message)
                    reject(err)
                }
                else{
                    console.log('student updated')
                    resolve(result)
                }
            })
        })
    }

    var delete_exist_skill = () => {
        var query = `delete from students_skills_link where student_id = ${id}`

        return new Promise(function(resolve, reject){
            db.connection.query(query, function(err, result){
                if(err)
                {
                    console.log(err.message)
                    reject(reason)
                }
                else{
                    resolve(result)
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

    try{
        await edit_student()
        await delete_exist_skill()
        .then(res => {
            get_skill_id()
            .then(ids => {
                var query = 'insert into `students_skills_link` set ? '
                ids.map((obj, ind)=>{
                    var params = {
                        student_id: id,
                        skill_id: obj.skill_id
                    }
    
                    db.connection.query(query, params, function(err, result){
                        if(err)
                        {
                            console.log(err.message)
                        }
                        else{
                            console.log("Inserted")
                        }
                    })
                })
            })
        })

    }
    catch(err){
        console.log(err)
        return(false)
    }
    finally{
        return(true)
    }
}

module.exports = {
    EditStudent
}