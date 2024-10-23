const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const auth = (req, res, next) => {
    try {
        const Authorization = req.header('Authorization');
        if (!Authorization) {
            return res.status(401).send({ error: 'Not authorized to access this resource' });
        }
        
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = data._id;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }
}

module.exports = auth;