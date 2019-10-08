const users = require('../controllers/users');

module.exports = (app) => {
    app.get('/',(req,res) => users.index(req,res));
    app.get('/login', (req,res) => users.signin(req,res));
    app.post('/register', (req,res) => users.register(req,res));
    app.post('/login', (req, res) => users.login(req,res));
    app.get('/logout',(req,res)=> users.logout(req,res));
    app.get('/dashboard',(req,res)=> users.dashboard(req,res));
}