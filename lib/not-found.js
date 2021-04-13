'use strict';

module.exports = (req, res, next) => {

  let output = {
    message: "404 error, not found.",
  }
  res.status(404).json(output);
  
};