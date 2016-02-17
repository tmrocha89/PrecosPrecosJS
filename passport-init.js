var mongoose = require('mongoose');
var Users = mongoose.model('User');
var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');



module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        //diz ao passport que id utilizar para o User
        console.log('serializing user:',user._id); //o mongo cria este atributo para todos
        return done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        //return object user back
        Users.findById(id, function(err,user){
            if(err){
                return done(err,false);
            }
            if(!user){
                return done('user not found',false);
            }

            return done(null,user);
        });

    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        //callback function
        function(req, username, password, done) {
            Users.findOne({'username': username}, function(err,user){
                if(err){
                    return done(err,false);
                }
                if(!user){
                    return done('user not registered', false);
                }
                if(!isValidPassword(user, password)){
                    return done('password invalid',false);
                }

                return done(null,user);
            });
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            // Verificar se o utilizador ja existe
            Users.findOne({'username': username}, function(err,user){
                
                if(err){
                    console.log('Error in SignUp: '+err);
                    return done('Db error ' + err, false);
                }

                if(user){
                    console.log('User already exists with username: '+username);
                    return done('username already taken',false);
                }

                //else
                // adicionar o utilizador a BD
                var user = new Users();

                user.username = username;
                user.password = createHash(password);

                user.save(function(err){
                    if(err){
                        console.log('Error in Saving user: '+err);  
                        throw err;
                        //return done(err, false);
                    }

                    console.log('utilizador registado com sucesso');
                    return done(null, user);
                });
            });           
        })
    );

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};