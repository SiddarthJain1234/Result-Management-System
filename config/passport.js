const passport=require('passport')
const LocalStrategy = require('passport-local');


    passport.use(new LocalStrategy({
        usernameField:'email'
    },
    function verify(username,password,done){
        //find a user and estabilish a identity
        // User.findOne({email:username})
        // .then((doc)=>{
        //     if(doc.password!= password){
        //         console.log('Invalid Username/Password');
        //         return done(null, false);
        //     }
        //     return done(null, doc);
        // })
        // .catch((err)=>{console.log('error in finding user --> passport'); return done(err);})
        console.log('code coming here');
        if(username==='admin@123' && password==='admin'){
            return done(null, {username:'admin@123',password:'admin'});
        }
        else{
            
            return done(null,false);
        }
    }
    ));



    passport.serializeUser(function(user, cb) {
       
          return cb(null, user);
       
      });
    
    
    
      passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, user);
        });
      });



module.exports=passport;