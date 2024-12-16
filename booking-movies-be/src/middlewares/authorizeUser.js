const jwt = require("jsonwebtoken");

const authorize = (allowedRoles) => {
    return (req, res, next) => {
        try {

            const token =
                req.cookies.token || req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({
                    status: "Failed",
                    message: "Access Denied: No token provided",
                });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (!allowedRoles.includes(decoded.role_id)) {
                return res.status(403).json({
                    status: "Failed",
                    message: "Access forbidden: Insufficient permissions",
                });
            }

            req.user = decoded;
            next();
        } catch (error) {
            console.error("Authorization error:", error.message);
            return res.status(403).json({
                status: "Failed",
                message: "Invalid token or permission denied",
            });
        }
    };
};

module.exports = authorize;