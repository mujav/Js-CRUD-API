const { json } = require("express")
const passport = require("passport")
const User = require("../models/user")

module.exports = {
    index:(req, res) => {
        User.find({})
        .then(users => {
            res.json(users)
        })
        .catch(error => {
            res.json({error: error})
        })
    },
    show:(req, res) => {
        let userId = req.params.uid
        User.findById(userId)
        .then(user => {
            res.json({user})
        })
        .catch(error => {
            res.json({error: error})
        })
    },
    update:(req, res) => {
        let userId = req.params.uid
        let userInfo = {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
        User.findByIdAndUpdate(userId,{$set: userInfo})
        .then(user => {
            res.json({message: "User information has been Updated"})
        })
        .catch(error => {
            res.json({error: error})
        })
    },
    delete: (req, res) => {
        let userId = req.params.uid
        User.findByIdAndRemove(userId)
        .then( () => {
            res.json({message: "User has been deleted"})
        })
        .catch( error => {
            res.json({error: error})
        })
    },
    create: (req, res) => {
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        })
        User.register(newUser, req.body.password, (error, user) => {
            if(user){
                res.json({message: "User has been Created"})
            } else {
                res.json({ error: error})
            }
        })
    },
    authenticate: (req, res) => {
        passport.authenticate('local', (error, user) => {
            if(user) {
                let signedToken = jsonWeb.sign({
                    data: user._id,
                    exp: new Date().setDate(new Date().getDate() + 1)
                }, 'Lacorbi86')
                res.json({
                    success: true,
                    token: signedToken
                })
            }
            else {
                res.json({
                    success: false,
                    message: 'Could not authenticate user'
                })
            }
        })
    },
    verifyJWT: (req, res, next) => {
        let token = req.body.token
        if(token) {
            jsonWebToken.verify(token, 'Lacorbi86', (error, payload) => {
                if(payload){
                    User.findById(payload.data).then(user => {
                        if(user){
                            next()
                        }
                        else{
                            json.send({error: error})
                        }
                    })
                }else{
                    res.json({message: "No user was found", error: true})
                }
            })
            next()
        }
        else {
            res.json({error: "Please provide a token"})
        }
    }
}