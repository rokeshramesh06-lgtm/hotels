# 🚀 Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies

```bash
cd hotels
npm run install-all
```

### Step 2: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is installed and running
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Go to https://www.mongodb.com/cloud/atlas
- Create free cluster
- Copy connection string
- Add to `backend/.env`: `MONGODB_URI=<your-connection-string>`

### Step 3: Configure Environment

Create `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/hotels
PORT=5000
JWT_SECRET=dev-secret-key-123
GOOGLE_MAPS_API_KEY=your-api-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Step 4: Start Development

```bash
npm run dev
```

- Backend: http://localhost:5000
- Frontend: http://localhost:5173

## 📱 Test the Application

### 1. Register User
- Go to http://localhost:5173/login
- Click "Sign Up"
- Fill form and register as **Regular User**

### 2. Find Restaurants
- After login, you'll see nearby restaurants
- Use search and filters
- Click restaurant to see details

### 3. Book a Table
- Click restaurant card
- Click "Book a Table"
- Select date, time, guests
- Confirm booking

### 4. Restaurant Owner Features
- Register as **Restaurant Owner**
- Go to Dashboard (from nav menu)
- Add restaurant
- Add menu items

## 🔑 Key Features to Test

✅ **Authentication**: Register, login, logout
✅ **Search**: Find restaurants by name, cuisine, price
✅ **Filters**: Filter by AC, family-friendly, top-rated, etc.
✅ **Reviews**: See customer reviews and ratings
✅ **Booking**: Reserve tables with date/time
✅ **Favorites**: Save restaurants and dishes
✅ **Profile**: View bookings, orders, saved items

## 📝 Example Test Data

### Test User 1 (Regular User)
```
Email: user@test.com
Password: password123
Role: user
```

### Test User 2 (Restaurant Owner)
```
Email: owner@test.com
Password: password123
Role: restaurant_owner
```

## 🛠️ Useful Commands

```bash
# Start only backend
npm run dev --workspace=backend

# Start only frontend
npm run dev --workspace=frontend

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Start production server
npm start
```

## 🐛 Troubleshooting

### Can't connect to MongoDB?
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Or restart MongoDB
brew services restart mongodb-community
```

### Port already in use?
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### CORS errors?
- Check backend is running on http://localhost:5000
- Check frontend is running on http://localhost:5173
- Check browser console for actual error

### Blank page?
- Clear browser cache
- Check browser console for errors
- Check network tab to see API calls

## 📚 Project Structure

```
hotels/
├── backend/               # Express API server
│   ├── src/
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Business logic
│   │   └── middleware/   # Auth & validation
│   └── package.json
├── frontend/              # React web app
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable components
│   │   ├── services/     # API calls
│   │   └── context/      # State management
│   └── package.json
└── README.md
```

## 🚀 Next Steps

1. **Customize UI**: Update Tailwind colors in `frontend/tailwind.config.cjs`
2. **Add Google Maps**: Get API key and add to `.env`
3. **Setup Cloudinary**: For image uploads
4. **Deploy**: Follow [DEPLOYMENT.md](DEPLOYMENT.md)
5. **Database**: Setup MongoDB Atlas for production

## 📞 Common Questions

**Q: Do I need MongoDB installed?**
A: Yes, either locally or use MongoDB Atlas

**Q: Can I use a different database?**
A: Yes, update models to use different ORM (Prisma, TypeORM)

**Q: How do I add more food items?**
A: Login as restaurant owner, go to dashboard, click "Add Food"

**Q: How do I delete my account?**
A: Currently not implemented, contact admin

**Q: Can I use this on mobile?**
A: Website is responsive, works on mobile. Mobile app can be built with React Native

## 🎓 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [REST API Best Practices](https://restfulapi.net/)

## 💡 Tips

- Use Postman to test API endpoints
- Check browser DevTools console for errors
- Enable MongoDB Atlas IP whitelist for production
- Use environment variables for sensitive data
- Test on mobile devices for responsive design
