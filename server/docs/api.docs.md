# API endpoints documentation

## Auth Routes

### POST /api/auth/register

**request payload**

```
{
  "username": "doujin22",
  "password": "password"
}
```

**response**
- status **201**
```
{
  "message": "Registered succesfully, please login"
}
```

### POST /api/auth/login

**request payload**

```
{
  "username": "doujin22",
  "password": "password"
}
```

**response**
- status **200**
```
{
  "message": "Login succesfully"
}
```
- `after logging in, the user information is stored in the session.`