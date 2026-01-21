const express =  require("express");
const app = express();
const port = 8080;

const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');


app.listen(port, ()=>{

     console.log(`The server is listening at port ${port}`);


})





const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'registry_system_db',
  password : "Shoaib098890@"
});



const createRandomUser = () => {
  return [
    
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
    
    ]; 

}



let data = [];

for(let i=1; i<=100; i++)
{
    data.push(createRandomUser());


}

console.log("Data Count ", data.length);



let q =  "INSERT into users(id, username, email, password) values ?  ";

// let q =  "select * from users";




try{

    connection.query(q, [data], (err, result)=>{

        if (err) throw err;
        console.log(result);



    })



}



catch(err){

    console.log(err);

}





app.get("/", (req, res)=>{

    res.send("You contacted the root path");



})