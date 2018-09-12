const mongoose      = require('mongoose')
const passport      = require('passport')
const LocalStrategy = require('passport-local')


const Users = mongoose.model('Users');


passport.use( 'login', new LocalStrategy({
    usernameField: 'user[email]',
    passwordFiled: 'user[password]',
},(email, password,done) => {
    Users.findOne({email})
        .then((user) => {
            if(!user || !user.validatePassword(password)){
                return done(null,false,{error:{ 'email or password': 'is invalid' }})
            }
            return done(null, user);
        }).catch(done)
}));