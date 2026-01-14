const checkCredentials = (req, res, next) => {
    const { name, email } = req.body;

    if (!name) {
        return res.status(400).json({
            status: false,
            message: "Name is required."
        })
    }

    if (!email) {
        return res.status(400).json({
            status: false,
            message: "Email is required."
        })
    }
    next()
};


module.exports = checkCredentials