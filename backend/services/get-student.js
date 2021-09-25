const db = require("./db");

const GetStudent = async (id) => {
    var data = {'skills': []};
    var get_student_details = () => {
        var query = `select first_name, last_name, mobile, email, gender, dob, qualification, profile_img, description 
        from students where student_id=${id};`

        return new Promise(function(resolve, reject){
            db.connection.query(query, function (err, res) {
                if(err){
                    console.log(err)
                    reject(err)
                }
                else {
                    data['first_name'] = res[0].first_name
                    data['last_name'] = res[0].last_name
                    data['mobile'] = res[0].mobile
                    data['email'] = res[0].email
                    data['gender'] = res[0].gender
                    res[0].dob.setDate(res[0].dob.getDate() + 1);
                    data['dob'] = res[0].dob
                    data['qualification'] = res[0].qualification
                    data['profile_img'] = res[0].profile_img?.toString('base64') 
                    data['buffer'] = res[0].profile_img
                    data['description'] = res[0].description
                    resolve(res)
                }
            })
        })
    }
    // get_student_details().then(res => console.log(data))
    
    var get_student_skills = () => {
        query =
        `
        select skills.name from skills 
        inner join students_skills_link 
        on (skills.skill_id = students_skills_link.skill_id)
        where student_id = ${id} ;
        `

        return new Promise(function(resolve, reject){
            db.connection.query(query, function(err, res){
                if(err){
                    console.log(err)
                    reject(err)
                }
                else{
                    resolve(res)

                }
            })
        })
    }
    
    try{
        await get_student_details()
        var res = await get_student_skills()
        res.map((obj, ind) => {
                data['skills'].push(obj.name)
            })
    }
    catch(err){
        console.log(err)
    }
    finally{
        return(data)
    }
    
}

module.exports ={
    GetStudent
}