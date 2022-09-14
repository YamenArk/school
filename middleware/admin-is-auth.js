const jwt = require('jsonwebtoken');
const Instructor = require('../models/instructor');

module.exports = async(req, res, next) => {
  try
  {
    const authHeader = req.get('authorization');
  
    if (!authHeader) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    }
    const token =authHeader;
    let decodedToken ;
    decodedToken = jwt.verify(token, 'somesupersecretsecret');
    if (!decodedToken) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    }
    req.userId = decodedToken.userId;
    const instructor = await Instructor.findByPk(req.userId)
    if(!instructor || instructor.role != 0 || instructor.username != decodedToken.username)
    {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    } 
    next();
  }
  catch(err)
  {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  };
};