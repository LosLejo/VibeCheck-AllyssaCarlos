/**
 * Async Handler Wrapper
 * 
 * Wraps async route handlers to automatically catch errors
 * and pass them to the error middleware.
 * 
 * Usage:
 *   router.get('/route', asyncHandler(async (req, res) => {
 *       // your async code here
 *   }));
 */

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
