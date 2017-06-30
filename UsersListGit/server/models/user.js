/*jslint es6 */
"use strict";
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, minlength: 2, maxlength: 60},
    lastname: {type: String, minlength: 2, maxlength: 60},
    email: {type: String, maxlength: 99, required: true},
    dateOfBirth: {type: Date},
    password: {type: String, match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/},
    role: {type: String, enum: ["admin", "viewer"]}

});

userSchema.pre("save", function (next) {
    var user = this;

  // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) {
        return next();
    }

  // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }

    // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }

      // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    console.log(candidatePassword);
    console.log(this.password);
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
            cb(null, isMatch);
    });
};
  // true  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
  //       if (err) {
  //           return cb(err);
  //       }
  //       , isMatch);
  //   });


module.exports = mongoose.model("user", userSchema, "user");
