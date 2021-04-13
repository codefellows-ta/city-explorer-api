'use strict';

module.exports = (err, req, res, next) => {

  let output = {
    error: err,
    message: '500 error, Something went wrong.'
  };

  res.status(500).send(output);
  
};