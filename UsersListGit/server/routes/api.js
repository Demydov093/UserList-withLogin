/*jslint es6 */
"use strict";
const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");


const db = "mongodb://me:1@ds133192.mlab.com:33192/users";
mongoose.Promise = global.Promise;

mongoose.connect(db, function (err) {
    if (err) {
        console.error("Error!" + err);
    }
})
router.get("/users", function (req, res) {
    console.log("Get all users");
    if (req.get("Authorization") === "Bearer my-jwt-token") {
        const p = +req.get("p") - 1;
        const number = +req.get("number");
        if (p >= 0) {
            User.find({}).limit(number).skip(number * p)
                .exec(function (err, users) {
                    if (err) {
                        console.log("Error get users");
                    } else {
                        res.json(users);

                    }
                });
        }
    }
});
router.get("/userscount", function (req, res) {
    console.log("Get all users count");
    if (req.get("Authorization") === "Bearer my-jwt-token") {
        User.count({})
            .exec(function (err, count) {
                if (err) {
                    console.log("Error get users");
                } else {
                    res.json({success: true, count: count});
                    console.log(count);
                }
            });
    }
});
router.get("/userssearch", function (req, res) {
    console.log("Get search");
    if (req.get("Authorization") === "Bearer my-jwt-token") {
        const search1 = new RegExp(`^${req.get("search1")}.*$`, 'i');
        const search2 = new RegExp(`^${req.get("search2")}.*$`, 'i');
        console.log(req.get("search1"));
        console.log(req.get("search2"));
        if (req.get("search2") === "" || req.get("search2") === " ") {
            User.find({ $or: [{name: search1}, {lastname: search1}, {email: search1}]})
                .exec(function (err, users) {
                    if (err) {
                        console.log("Error get users");
                    } else {
                        res.json(users);
                    }
                });
        } else {
            User.find({ $and: [{name: search1}, {lastname: req.get(search2)}]})
                .exec(function (err, users) {
                    if (err) {
                        console.log("Error get users");
                    } else {
                        res.json(users);
                    }
                });
        }
    }
});

router.get("/users/:id", function (req, res) {
    console.log("Get one user");
    User.findById(req.params.id)
        .exec(function (err, user) {
            if (err) {
                console.log("Error get users");
            } else {
                res.json(user);
            }
        });
});
router.post("/user", function (req, res) {
    console.log("Add user");
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.lastname = req.body.lastname;
    newUser.email = req.body.email;
    newUser.dateOfBirth = req.body.dateOfBirth;
    newUser.password = req.body.password;
    newUser.role = req.body.role;
    newUser.save(function (err, insertUser) {
        if (err) {
            console.log("Error save");
        } else {
            res.json(insertUser);
        }
    });
});

router.put("/user/:id", function (req, res) {
    console.log("Update");
    User.findByIdAndUpdate(req.params.id,
            {
        $set: {name: req.body.name, lastname: req.body.lastname, email: req.body.email, dateOfBirth: req.body.dateOfBirth, password: req.body.password, role: req.body.role}
        },
            {new: true},
            function (err, updateUser) {
        if (err) {
            res.send("error update");
        } else {
            res.json(updateUser);
        }
    });
});

router.delete("/user/:id", function (req, res) {
    console.log("Delete");
    User.findByIdAndRemove(req.params.id, function (err, deleteUser) {
        if (err) {
            res.send("Error delete");
        } else {
            res.json(deleteUser);
        }
    });
});

router.post("/authenticate", function (req, res) {
    const name = req.body.name;
    User.findOne({name: name})
        .then(function (user) {
            if (!user) {
                console.log("No name1");
                res.json({success: false, message: "Wrong name"});
            } else {
        // checking the passowords here
                console.log("comparing");
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (err) {
                        console.log("No compare")
                        throw err;
                    }
                    console.log("Compare")
                    console.log(isMatch); // true
                    if (!isMatch) {
                        console.log("No pass");
                        res.json({success: false, message: "Wrong pass"});
                    } else {
                        console.log("Pass");
                        res.json({success: true, token: "my-jwt-token"});
                    }
                });
            }
        });
});
module.exports = router;
