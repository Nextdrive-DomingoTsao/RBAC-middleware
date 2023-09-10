import express from 'express';

const bizAdmin = express.Router();

export function bizAdminGuardRouteGuard(req, res, next) {
  if (req.body.role !== 'bizAdminRole') {
    /* 
    Solution: next('router'):
      make all the middleware at this router (a.k.a bizAdmin here) be bypassed / skipped.
      then we will go to end-user reset password.
      next('router') in Express API guide: 
      https://expressjs.com/en/5x/api.html#next('router'):~:text=following%20example%20illustrates-,next(%27router%27),-usage.
    */
    return next('router');
  }
  return next();
}

export function bizAdminMiddlewareGuard(req, res, next) {
  if (req.body.role !== 'bizAdminRole') {
    console.log('next');
    /* 
    Solution: next('router'):
      make all the middleware at this router (a.k.a bizAdmin here) be bypassed / skipped.
      then we will go to end-user reset password.
      next('router') in Express API guide: 
      https://expressjs.com/en/5x/api.html#next('router'):~:text=following%20example%20illustrates-,next(%27router%27),-usage.
    */
    return next();
  }
  return next();
}

const bizAdminValidator = {
  bizAdminResetPassword: (req, res, next) => {
    next();
  },
};

function bizAdminMiddlewareOne(req, res, next) {
  next();
}
function bizAdminMiddlewareTwo(req, res, next) {
  next();
}
export function bizAdminResetPassword(req, res, next) {
  if (req.body.role !== 'bizAdminRole') {
    console.log('next');
    /* 
    Solution: next('router'):
      make all the middleware at this router (a.k.a bizAdmin here) be bypassed / skipped.
      then we will go to end-user reset password.
      next('router') in Express API guide: 
      https://expressjs.com/en/5x/api.html#next('router'):~:text=following%20example%20illustrates-,next(%27router%27),-usage.
    */
    return next('route');
  }
  console.log('route to biz admin reset password');
  return res.status(200).json({
    msg: 'biz admin reset user password',
  });
}

bizAdmin.use(
  bizAdminGuardRouteGuard,
  bizAdminValidator.bizAdminResetPassword,
  bizAdminMiddlewareOne,
  bizAdminMiddlewareTwo,
  bizAdminResetPassword
);

export default bizAdmin;
