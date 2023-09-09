import express from 'express';

const endUser = express.Router();

function endUserGuard(req, res, next) {
  if (req.body.role !== 'endUserRole') {
    return next(new Error('even not a end user'));
  }
  return next();
}

const userValidator = {
  userResetPassword: (req, res, next) => {
    next();
  },
};

function endUserMiddlewareOne(req, res, next) {
  next();
}
function endUserMiddlewareTwo(req, res, next) {
  next();
}
function endUserResetPassword(req, res) {
  console.log('route to end-user reset password');
  return res.status(200).json({
    msg: 'end user reset password',
  });
}

endUser.use(
  endUserGuard,
  userValidator.userResetPassword,
  endUserMiddlewareOne,
  endUserMiddlewareTwo,
  endUserResetPassword
);

export default endUser;
