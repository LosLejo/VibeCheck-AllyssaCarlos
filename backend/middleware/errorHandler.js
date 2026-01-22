/**
 * Error Handling Middleware
 * 
 * This middleware catches all errors and returns a consistent JSON response.
 * It should be registered AFTER all routes in index.js.
 */

// 404 Not Found Handler - catches requests to non-existent routes
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        error: "Route not found",
        path: req.originalUrl,
        method: req.method
    });
};

// Global Error Handler - catches all thrown errors
const errorHandler = (err, req, res, next) => {
    console.error("Error occurred:");
    console.error(err.stack);

    // Default to 500 if no status code is set
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        error: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
};

module.exports = { notFoundHandler, errorHandler };
