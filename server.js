const express = require('express'),
    app = express(),
    port = 8000,
    server = app.listen(port, console.log(`Listening on port ${port}`)),
    session = require("express-session"),
    flash = require("express-flash");
    
require('mongoose-type-email');

app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({extended: true}));

app.use(flash());
app.use(session({
    secret: 'bennyBobKitchen',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//mongoose stuff
require('./server/config/database.js');

//ROUTES
require('./server/config/routes.js')(app);