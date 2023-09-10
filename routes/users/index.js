import express from 'express';
import bizAdmin, {
  bizAdminMiddlewareGuard,
  bizAdminResetPassword,
} from './bizAdmin.js';
import endUser, { endUserGuard, endUserResetPassword } from './endUser.js';

const users = express.Router();

// ---------------- Please skip, just some middlewares for sample ------------------
function checkAuthTokenInHeader(req, res, next) {
  next();
}
function checkBodyIsEmptyOrNot(req, res, next) {
  next();
}

function wrappedAuthVerifyAccessToken(req, res, next) {
  next();
}
function userInfoChecker(req, res, next) {
  // RBAC checker
  next();
}

// ---------------- Solution start from here ------------------
const resetByRoles = [bizAdmin, endUser];

users.put(
  '/reset-password',
  // check whether token is in header
  checkAuthTokenInHeader,
  // check body, throw error if null
  checkBodyIsEmptyOrNot,
  // Authentication
  wrappedAuthVerifyAccessToken,
  // Autorization, based on RBAC
  userInfoChecker,
  // --- New design for RBAC reset password ---
  // resetByRoles
  bizAdminMiddlewareGuard,
  bizAdminResetPassword
);

// another route.
users.put('/reset-password', endUserResetPassword);

export default users;
