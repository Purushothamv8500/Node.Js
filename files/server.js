const express = require("express");
const app = express();
// const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");
// import react from 'react';
// Modules in node


app.get('/users', function(request, response) {
    let users = [];
    fs.readFile('./files/users.js', (err, response)=>{
     if(err) throw err; 
     users = response;
     console.log(users);

    })
    response.send(users);
    

})
// app.get('/Products', function(request, response) {
//    MongoClient.connect("mongodb+srv://purushothamv8500:<db_password>Rohith@143.u6gpr.mongodb.net/",(err, db) =>{
//     if(err) throw err;
//     console.log("database connected");
//     db.close()
        
//    })

// })
// app.get('/users', function(request, response) {
//     const users = fs.readFile('./files/users.js', (response)=>{
      

//     })
    

// web server

app.listen(8080)