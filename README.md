## POC for RBAC middleware design

Test for RBAC & Middleware design based on open-close principle

### Endpoint:

```
Method: PUT
URL: http://localhost:3000/v1/user/reset-password
```

### Body (can be shifted as header or so)

```
For biz::Admin:
{
  "role": "bizAdminRole"
}

For end user
{
  "role": "endUserRole"
}
```

### Proposal

1. Add a `strategy layer` at reset password middleware. But the strategy layer bypass routes based on `req.header.role` or `req.body.role` that `userInfoCheck` middleware attatched. And still we could not get the msaage inside **req object** owing to the difference between middleware layer and application layer

> 中文解釋： Router 裡的 Middleware 無法直接拿到 req object 內容來幫助 Strategy 根據使用者的 Role & permission 分流，因此卡關

2. Place biz::admin, PF::admin, endUser router together, and use next('router') to skip the whole router if role / permission does not match

> 中文解釋：用 biz::admin, PF::admin, endUser 等 router 來去做未來的 RBAC middleware 分流，並將所有這些較小的 router 放在一起，透過每次進入小 router 後的 `Role Guard` 來去阻擋非授權的用戶使用到這些 middleware

優點：相較於拆分 endpoint，結合在同一個 endpoint，並透過 RBAC model 做區分，幫助未來在做 RBAC model based 的功能擴展時，可以更 **Open-Close Principle**.
缺點：透過 `next('router')` & 分不同 router 的方式會讓所有的 endpoint 都需要額外包 router，會變成耦合 router (不好管理 endpoint)

3. Place biz::admin, PF::admin, endUser router together, and use `next('route')` to skip the whole router if role / permission does not match
  
優點：擁有第二個解的優勢，也解決其缺點，透過 next('route') 的方法跳到同個 endpoint 的 middleware（router 內會有多個同個 originUrl 的 endpoint）
```js
function routeJumper(req, res, next) {
  next('route');
}

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
  routeJumper
);

// biz:admin route
users.put('/reset-password', bizAdminMiddlewareGuard, bizAdminResetPassword);

// end user route.
users.put('/reset-password', endUserGuard, endUserResetPassword);
```

### Key point to the solution

1. RBAC permision design (a.k.a. userInfoChecker), we must authorization user permission by this middleware
2. For all role-customized router, like `bizAdmin`, `endUser`, the [next('router')](<https://expressjs.com/en/5x/api.html#next('router'):~:text=following%20example%20illustrates-,next(%27router%27),-usage.>) help us skip a entire router, which might be `bizAdmin` router, `pfAdmin` router (not implement here), or `endUser` router.
