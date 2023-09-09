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

### Key point to the solution

1. RBAC permision design (a.k.a. userInfoChecker), we must authorization user permission by this middleware
2. [next('router')](<https://expressjs.com/en/5x/api.html#next('router'):~:text=following%20example%20illustrates-,next(%27router%27),-usage.>) help us skip a entire router, which might be `bizAdmin` router, `pfAdmin` router (not implement here), or `endUser` router.
