const express = require('express');
const User = require('../models/User');
const { query, body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connections } = require('mongoose');
var fetchuser = require('../middleware/fetchuser');
//ROUTE 1:post "/api/auth/createUser"

const JWT_SEC = "SECREATES$TRING";
router.get('/', (req, res) => {
    return res.json({ msg: "WORKING AP" })
})

router.post('/createUser', [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').notEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: "ENTER VALID DETAILS" })
        }

        try {
            //check whether the user with this email exist already
            let user = await User.findOne({ email: req.body.email });
            console.log(user);

            if (user) {
                return res.status(400).json({ errors: "a user with this email already exists" })
            }
            // User.updateOne


            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            //create a new user
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
            });

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SEC);
            // console.log(jwtData);
            res.json({ authToken });

        }

        catch (error) {
            res.status(500).json({ error, errors: "EROOR OCUURED" })
        }

    })


//ROUTE 2:post "/api/auth/login"
router.post('/login', [
    body('email', 'enter valid email').isEmail(),
    body('password', 'password can not br blank').notEmpty()],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "TRY LOGIN  WITH CORRECT CERDENTIALS" })
        }

        try {
            const { email, password } = req.body;
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).josn({ success, error: "please try to login with correct credential" });
            }

            const passwordComp = await bcrypt.compare(password, user.password);
            if (!passwordComp) {
                return res.status(400).json({ success, error: "please try to login with correct credential" });
            }

            const data = {
                user: { id: user.id }
            }

            const authToken = jwt.sign(data, JWT_SEC);
            success = true;
            console.log(success);
            res.json({ success, authToken });
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ success, error: "LOGIN ERROR ", error })
        }
    });

//ROUTE : 3 post "/api/auth/getuser"

router.post('/getUser', fetchuser,
    async (req, res) => {


        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-passowrd");
            res.send(user);
        }
        catch (error) {
            console.log(error + "eroor is ")
            res.status(500).json({ Error: "LOGIN ERROR ", error })
        }
    })
//51 V//



module.exports = router;
