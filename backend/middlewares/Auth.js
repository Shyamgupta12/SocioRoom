const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        console.log(token);

            
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        // Skip token verification for logout endpoint
        if (req.path === '/logout') {
            return next();
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select("-password");

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            req.user = user;
            next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: "Unauthorized - Token Expired" });
            } else {
                return res.status(401).json({ error: "Unauthorized - Invalid Token" });
            }
        }
    } catch (error) {
        console.log("Error in auth middleware: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = auth;
