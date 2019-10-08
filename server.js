const express = require('express'),
    app = express(),
    port = 8000,
    server = app.listen(port, console.log(`Listening on port ${port}`)),
    session = require("express-session"),
    flash = require("express-flash"),
    mongoose = require("mongoose"),
    bcrypt = require("bcrypt");
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

mongoose.connect("mongodb://127.0.0.1/loginReg", {useNewUrlParser: true, useUnifiedTopology: true});

const UserSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: [true, "First name is required"],
        minlength: [3,"First name must be longer than 3 characters"]
    },
    last_name: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [3,"Last name must be longer than 3 characters"]
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: [true, "You need an email address"]

    },
    password: {
        type: String,
        required: [true,"You need a password"]
    },
    birthdate: {
        type: Date,
        required: [true,"Gotta have a BDay!"]
    }
},{timestamps:true});

const User = mongoose.model("User",UserSchema);


app.get('/', (req, res)=> {
    res.render('index');
})
