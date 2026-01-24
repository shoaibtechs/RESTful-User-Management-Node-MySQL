const express =  require("express");
const app = express();
const port = 8080;

const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));






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



// let data = [];

// for(let i=1; i<=100; i++)
// {
//     data.push(createRandomUser());


// }

// console.log("Data Count ", data.length);



// let q =  "INSERT into users(id, username, email, password) values ?  ";

// // let q =  "select * from users";




// try{

//     connection.query(q, [data], (err, result)=>{

//         if (err) throw err;
//         console.log(result);



//     })



// }



// catch(err){

//     console.log(err);

// }



// Route to show count of total users in Database 

app.get("/", (req, res)=>{

    
    let q =  "Select count(*) as total_users  from users ";

    try{

        connection.query(q, (err, result)=>{

            let users =  result[0]["total_users"];
            
            res.render("totalUsers.ejs", {users});
            
        
        })

    }
        
    catch(err)
    {
        console.log(err);


    }

})



app.get("/users", (req, res)=>{


    let q =  "select * from users ";



    try{

        connection.query(q, (err, result)=>{


            res.render("showUsers.ejs", {users : result });



        })



    }



catch(err)
{
  
    console.log(err);
    res.send("Due to the technical error we are not able to display the users ");

}



})



app.get("/users/:id/edit", (req, res)=>{


    let {id} =  req.params;
    
    let q = `select * from users where id = '${id}' `;

    try{

        connection.query(q, (err, result)=>{

            
            let user =  result[0];
            
            res.render("edit.ejs", {user});



    })


    }

    catch(err)
    {
        console.log(err);
        res.send("Due to the technical error we are not able to edit the username  ");


    }


})


app.patch("/users/:id", (req, res)=>{


    let{id} =  req.params;

    let {password , username:newUsername} =  req.body;

    let q = `select * from users where id='${id}' `;
    
    try{

            connection.query(q, (err, result)=>{


                if(err) throw err ;
                    
                let user =  result[0];


                if(user.password.trim() ===  password.trim()  )
                {


                    let q2 =  `update users set username='${newUsername}' where id='${id}' `;

                    connection.query(q2, (err, result )=>{

                        if(err) throw err;
                        res.redirect("/users");


                    })




                }
                else{

                    res.send(`Wrong Password `);


                }



            })
        

        

        }



    

    
    catch(err){

        console.log(err);
        res.send("Due to the technical error we are not able to edit the username from patch request  ");



    }
    

    
})


