const jsonwebtoken = require("jsonwebtoken");

// Auth middleware
module.exports = async (request, response, next) => {
  try {
    // Token input
    const token = request.headers["authorization"];
    // Return unauthorized for token that are not passed
    if (!token) return response.status(401).json({ error: "Unauthorized" });
    // Authorization is granted by JSON web token
    const authorized = await jsonwebtoken.verify(token, process.env.SECRET);
    // Set the results to the request
    request.user = authorized;
    next();
  } catch (error) {
    response.status(500).json({ error: error })
  }
};
