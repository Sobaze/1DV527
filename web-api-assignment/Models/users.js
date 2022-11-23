import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true, maxlength: 20, minlength: 4 },
    password: { type: String, required: true, minlength: 5 }
});


//method taken from https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt

userSchema.pre('save', function (next) {
    const user = this;

    if(this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if(saltError) {
                return next(saltError);
            } else {
                bcrypt.hash(user.password, salt, function (hashError, hash) {
                    if(hashError) {
                        return next(hashError)
                    }
                    user.password = hash;
                    next();
                })
            }
        })
    } else {
        return next();
    }

});

userSchema.methods.comparePasswords = function (password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if(error) {
            return callback(error);
        } else {
            callback(null, isMatch)
        }
    })
}



const Users = mongoose.model('User', userSchema);

export default Users;