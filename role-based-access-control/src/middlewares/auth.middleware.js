const jwt = require('jsonwebtoken')

exports.authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).send({
                status: false,
                error: `Token is missing`
            })
        };

        const token = authHeader.split(" ")[1]

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next()
    } catch (error) {
        console.log("Invalid token");
    }
}

exports.authorizedRoled = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).send({
                status: false,
                message: "You are not authorized to access this resource."
            })
        }
        next();
    }
}


