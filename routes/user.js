const express = require('express');
const bcrpyt = require('bcrypt');
const router = express.Router();
const helper = require('../helpers/user');
const User = require('../models/user')

router.post('/signup', (req, res) => {
    User.find({email: req.body.email})
    .then(user => {
        if(user.length >= 1){
            res.status(422).json({
                message: "Email already registered!"
            });
        }
        else{
            bcrpyt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    res.status(500).json({
                        error: err
                    });
                }
                else{
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(newUser => {res.status(201).json(newUser)})
                    .catch(err => {res.send(err)});
                }
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
})

router.delete('/:userID', (req, res) => {
    User.remove({_id: req.params.userID})
    .then(() => {
        res.json({
            message: "Record deleted successfully"
        });
    })
    .catch(err => {res.status(500).json({
        error: err
    })})
});
    
module.exports = router;