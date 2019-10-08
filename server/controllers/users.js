const mongoose = require('mongoose'),
    bcrypt = require('bcrypt');


require('../models/user');
const User = mongoose.model('User');

module.exports = {
    index: (req,res) => {
        res.render('index');
    },
    register: (req,res) => {
        bcrypt.hash(req.body.password, 10)
        .then(hashed_password => {
            var user = new User();
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.email = req.body.email;
            user.password = hashed_password;
            user.birthdate = req.body.birthdate;
            user.save()
                .then( user => {
                    console.log(user._id);
                    req.session.userId = user._id;
                    res.redirect('/dashboard');
                })
                .catch( err => {
                    for(var key in err.errors){
                        req.flash('registration', err.errors[key].message);
                    }
                    res.redirect('/');
                })
        })
        .catch( err => {
            console.log(err);
        })
    },
    dashboard: (req, res) => {
        if(req.session.userId == null){
            req.session.destroy();
            res.redirect('/');
        }
        else{
            User.findOne({_id: req.session.userId})
                .then(user => {
                    console.log(user);
                    res.render('dashboard',{user: user});
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    logout: (req,res) => {
        req.session.destroy();
        res.redirect('/');
    },
    signin: (req,res) => {
        res.render('login');
    },
    login: (req,res) => {
        User.findOne({email: req.body.email})
        .then(user => {
            bcrypt.compare(req.body.password,user.password)
                .then(result => {
                    if(result == true){
                        req.session.userId = user._id;
                        res.redirect('dashboard');
                    }
                    else{
                        req.flash('login',"Password/Email is incorrect");
                        res.redirect('/login');
                    }
                })
        })
        .catch(err => {
            console.log(err);
            req.flash('login',"Password/Email is incorrect");
            res.redirect('/login');
        })
    }
}