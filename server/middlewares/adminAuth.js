const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const adminSignupAuth = (req, res, next) => {
    try {
        const Authorization = req.header('Authorization');
        if (!Authorization) {
            return res.status(401).send({ error: 'Not authorized to access this resource' });
        }

        const token = Authorization.split(' ')[1];
        if (!token) {
            return res.status(401).send({ error: 'Not authorized to access this resource' });
        }

        if(token !== process.env.ADMIN_SIGNUP_TOKEN){
            return res.status(401).send({ error: 'Not authorized to access this resource' });
        }
        next();
    }catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error", error: e.message });
    }
}

const adminJwtAuth = (req, res, next) => {
    try {
        const Authorization = req.header('Authorization');
        if (!Authorization) {
            return res.status(401).send({ error: 'Not authorized to access this resource' });
        }

        const token = Authorization.split(' ')[1];
        if (!token) {
            return res.status(401).send({ error: 'Not authorized to access this resource' });
        }

        const data = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
        req.adminId = data._id;
        next();
    }catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error", error: e.message });
    }
}

module.exports = {
    adminSignupAuth,
    adminJwtAuth
};