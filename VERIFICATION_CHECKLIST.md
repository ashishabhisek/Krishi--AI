# ✅ KrishiAI - Setup Verification Checklist

Use this checklist to verify your project is set up correctly.

---

## 📋 Pre-Setup Requirements

- [ ] Node.js v16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] PostgreSQL installed and running
- [ ] Git configured (if using version control)
- [ ] Text editor (VS Code recommended)

---

## 🔧 Installation & Configuration

- [ ] Repository cloned/downloaded
- [ ] `.env` file created from `.env.example`
- [ ] All `.env` variables filled in:
  - [ ] `DB_HOST=localhost`
  - [ ] `DB_PORT=5432`
  - [ ] `DB_NAME=krishiai_db`
  - [ ] `DB_USER=postgres`
  - [ ] `DB_PASSWORD=your_password`
  - [ ] `JWT_SECRET=random_secret_key`
  - [ ] `PORT=5000` (or your port)
  - [ ] `FRONTEND_URL=http://localhost:3000`

---

## 📦 Dependencies

- [ ] `npm install` completed without errors
  ```bash
  npm install
  ```
- [ ] All packages installed (`node_modules/` folder exists)
- [ ] `package.json` matches your Node version

---

## 🗄️ Database Setup

- [ ] PostgreSQL service is running
  ```bash
  # Verify with:
  psql -U postgres  # Should connect without error
  ```

- [ ] Database created
  ```bash
  psql -U postgres -c "CREATE DATABASE krishiai_db;"
  ```

- [ ] Tables created with migrations
  ```bash
  npm run migrate
  ```

- [ ] All 10 tables exist:
  - [ ] `users`
  - [ ] `queries`
  - [ ] `marketplace_products`
  - [ ] `orders`
  - [ ] `notifications`
  - [ ] `alerts`
  - [ ] `knowledge_articles`
  - [ ] `feedback`
  - [ ] `saved_tips`
  - [ ] `notification_preferences`

---

## 🚀 Server Startup

- [ ] Server starts without errors
  ```bash
  npm run dev
  ```

- [ ] Output shows:
  ```
  ✅ Database connected successfully
  ✅ All required database tables exist
  ✅ KrishiAI Backend running on port 5000
  ```

- [ ] No errors in console
- [ ] Server remains running (no crashes)

---

## 🔌 API Health Check

- [ ] Server is running on port 5000
- [ ] Health endpoint responds:
  ```bash
  curl http://localhost:5000/health
  ```
  Should return:
  ```json
  {
    "message": "KrishiAI Backend is running",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
  ```

---

## 🔐 Authentication Tests

### Send OTP
- [ ] OTP endpoint is accessible
  ```bash
  curl -X POST http://localhost:5000/api/auth/send-otp \
    -H "Content-Type: application/json" \
    -d '{"phoneNumber":"+919876543210"}'
  ```
- [ ] Response includes `message: 'OTP sent successfully'`
- [ ] OTP is sent via SMS (Twilio configured)

### Verify OTP  
- [ ] OTP verification endpoint works
  ```bash
  curl -X POST http://localhost:5000/api/auth/verify-otp \
    -H "Content-Type: application/json" \
    -d '{"phoneNumber":"+919876543210","otp":"123456"}'
  ```
- [ ] Response includes JWT token
- [ ] Token is valid and can be used for other requests

### Register User
- [ ] Register endpoint works
  ```bash
  curl -X POST http://localhost:5000/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{
      "phoneNumber":"+919876543210",
      "email":"farmer@example.com",
      "password":"password123",
      "firstName":"John",
      "lastName":"Farmer"
    }'
  ```
- [ ] User created in database
- [ ] Response includes user ID

### Login
- [ ] Login endpoint works with phone + password
- [ ] JWT token is returned
- [ ] Token can be used in Authorization header

---

## 📊 API Endpoints Tests

### Queries Endpoint
- [ ] Can submit query (with valid token)
  ```bash
  curl -X POST http://localhost:5000/api/queries \
    -H "Authorization: Bearer YOUR_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "title":"How to prevent pest?",
      "description":"My crops have pest infection",
      "category":"Pest"
    }'
  ```
- [ ] Query saved in database
- [ ] Can retrieve user's queries

### Marketplace Endpoint
- [ ] Can view products (public access):
  ```bash
  curl http://localhost:5000/api/marketplace
  ```
- [ ] Can create product (with valid token)
- [ ] Products appear in list after creation
- [ ] Can update/delete own products

### Profile Endpoint
- [ ] Can view own profile (with valid token)
- [ ] Can update profile
- [ ] Can get notification preferences
- [ ] Can update preferences

### Alerts Endpoint
- [ ] Can view all alerts (public)
- [ ] Admin can create alerts (with token + admin role)
- [ ] Alerts appear for relevant regions

### Feedback Endpoint
- [ ] Can submit feedback (with valid token)
- [ ] Admin can view all feedback
- [ ] Admin can respond to feedback

---

## 📧 Email Configuration

- [ ] Gmail configured:
  - [ ] 2-Factor Auth enabled
  - [ ] App password generated
  - [ ] Credentials in `.env`

- [ ] Email sending works:
  - [ ] Invite emails send
  - [ ] Query response emails send
  - [ ] Feedback acknowledgment emails send

---

## 📱 SMS Configuration (Twilio)

- [ ] Twilio account created
- [ ] Account SID, Auth Token, Phone in `.env`
- [ ] OTP SMS sends successfully
- [ ] Messages have correct format

---

## 📁 Project Structure

- [ ] All folders exist:
  - [ ] `src/config/`
  - [ ] `src/controllers/`
  - [ ] `src/routes/`
  - [ ] `src/middleware/`
  - [ ] `src/models/`
  - [ ] `src/utils/`
  - [ ] `public/`

- [ ] All critical files exist:
  - [ ] `src/server.js`
  - [ ] `src/constants.js`
  - [ ] `src/config/database.js`
  - [ ] `src/config/migrate.js`
  - [ ] `src/config/init.js`
  - [ ] `src/middleware/auth.js`
  - [ ] `src/middleware/validation.js`

---

## 📚 Documentation

- [ ] `SETUP.md` exists and readable
- [ ] `TROUBLESHOOTING.md` exists and helpful
- [ ] `QUICK_REFERENCE.md` exists with examples
- [ ] `IMPROVEMENTS.md` exists with changes
- [ ] `.env.example` has all necessary variables

---

## 🔄 Git & Version Control

- [ ] `.gitignore` configured properly
  - [ ] `node_modules/` ignored
  - [ ] `.env` ignored (not `.env.example`)
  - [ ] `logs/` ignored
  - [ ] Build files ignored

- [ ] Initial commit made (if using git)

---

## 🐛 Error Handling

- [ ] Invalid requests return 400 status
- [ ] Missing resources return 404 status
- [ ] Unauthorized requests return 401 status
- [ ] Server errors return 500 status
- [ ] Error messages are descriptive

---

## 🎯 Frontend Readiness

- [ ] `public/api-config.js` exists
- [ ] `public/api-client.js` exists
- [ ] Frontend can include API scripts:
  ```html
  <script src="public/api-config.js"></script>
  <script src="public/api-client.js"></script>
  ```
- [ ] API client works from frontend

---

## 📊 Database Data

- [ ] Can query users table
  ```bash
  psql -U postgres -d krishiai_db -c "SELECT COUNT(*) FROM users;"
  ```

- [ ] Can query queries table
  ```bash
  psql -U postgres -d krishiai_db -c "SELECT COUNT(*) FROM queries;"
  ```

- [ ] Can query other tables similarly
- [ ] Foreign key relationships work

---

## 🚀 Production Readiness

- [ ] `NODE_ENV` can be set to production
- [ ] Error logs don't expose sensitive data
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] Helmet security headers enabled
- [ ] All environment variables are required

---

## 📱 Frontend Integration

- [ ] Frontend can import API client
- [ ] Frontend can call `apiClient.sendOTP()`
- [ ] Frontend can call `apiClient.verifyOTP()`
- [ ] Frontend can call `apiClient.getProducts()`
- [ ] Frontend can use JWT token for protected endpoints

---

## 🔒 Security Verification

- [ ] No passwords/secrets in code
- [ ] All secrets in `.env` (not committed)
- [ ] JWT_SECRET is at least 32 characters
- [ ] Database password is strong
- [ ] CORS origin is restricted
- [ ] Rate limiting is active

---

## ⚡ Performance Check

- [ ] API responses in < 1 second
- [ ] Database queries are efficient
- [ ] No memory leaks (check after 1 hour runtime)
- [ ] File uploads work (if implemented)
- [ ] Large datasets don't crash server

---

## 🧹 Final Cleanup

- [ ] Removed test data (if created)
- [ ] Logs reviewed for errors
- [ ] Comments cleaned up
- [ ] Console.log statements removed (production)
- [ ] Dead code removed

---

## 📝 Documentation Complete

- [ ] README updated with current info
- [ ] API docs up to date
- [ ] Environment variables documented
- [ ] Deployment instructions written
- [ ] Contributing guidelines added

---

## ✅ Sign-Off

**Developer Name:** _________________

**Date:** _________________

**Project Version:** 1.0

**Status:** 
- [ ] Ready for Development
- [ ] Ready for Testing
- [ ] Ready for Staging
- [ ] Ready for Production

**Notes:** 
```
[Add any notes or issues here]
```

---

## 📞 Support

If any item fails:
1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Review [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
3. Check error logs
4. Verify `.env` configuration

Good luck! 🚀

---

**Checklist Version:** 1.0  
**Last Updated:** February 2024  
**KrishiAI Setup Verification**
