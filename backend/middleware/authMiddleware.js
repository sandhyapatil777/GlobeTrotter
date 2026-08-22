const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // ============================================
        // GET AUTHORIZATION HEADER
        // ============================================

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header is required"
            });
        }

        // ============================================
        // CHECK BEARER TOKEN
        // ============================================

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization format must be Bearer <token>"
            });
        }

        // ============================================
        // EXTRACT TOKEN
        // ============================================

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            });
        }

        // ============================================
        // VERIFY TOKEN
        // ============================================

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // ============================================
        // CHECK USER ID
        // ============================================

        if (!decoded.userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid token: userId not found"
            });
        }

        // ============================================
        // ATTACH USER ID TO REQUEST
        // ============================================

        req.userId = decoded.userId;

        console.log(
            "Authenticated User:",
            req.userId
        );

        // ============================================
        // CONTINUE
        // ============================================

        next();

    } catch (error) {

        console.error(
            "AUTH MIDDLEWARE ERROR:",
            error.message
        );

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;