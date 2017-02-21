# express-CRUD
A simple CRUD with filter, sort and search made in Express. EJS for frontend. Database is MySQL.

## Installation

    npm install

## Configuration (database)
server.js

      host: 'localhost',
      user: 'root',
      password : 'root',
      port : 8889, //If you use MAMP, make sure its set on the same port.
      database:'funny'	

## Serve
    
    nodemon server.js
    
You need to create a DB named funny. I used MAMP with phpMyAdmin for this.

## Access

    http://localhost:3000/
