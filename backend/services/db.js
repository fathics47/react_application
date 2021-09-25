var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'deekshee@2001',
  database: 'student_management'
})


module.exports={
    connection
}