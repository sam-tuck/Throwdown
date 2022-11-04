const commonresult = (req, res, next) => {
    res.resultvalue = function (data, message, status = 0) {
      res.send({
        status,
        data,
        message: message instanceof Error ? message.message : message,
      });
    };
    next();
  };
  
  module.exports = {
    commonresult,
  };