const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    serviceCenter: user.serviceCenter, // Include any additional user information needed in the token
  };

  const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Ensure you have a JWT secret set in your environment variables

  const options = {
    expiresIn: '1h', // Token expiration time
  };

  return jwt.sign(payload, secret, options);
};

module.exports = generateToken;
