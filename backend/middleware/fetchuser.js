const jwt = require('jsonwebtoken');
const JWT_SEC = "SECREATES$TRING";
const fetchuser = (req, res, next) => {
    //get user from th jwt tken and add id to req object
    const token = req.header('auth-token');
    if (!token)
        res.status(401).send({ error: "AUTH USING VALID TOKEN00" })

    try {
        const data = jwt.verify(token, JWT_SEC);
        req.user = data.user;

        next();
    } catch (error) {
        res.status(401).send({
            error1: "--AUTH USING VALID TOKEN00"
        })

    }
}

module.exports = fetchuser;