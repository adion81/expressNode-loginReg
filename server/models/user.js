const mongoose = require('mongoose');

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

mongoose.model("User", UserSchema);