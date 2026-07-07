# 🚀 Deployment Guide

## Prerequisites

- Node.js 16+
- npm 7+
- MongoDB (local or Atlas)
- Google Maps API Key
- Cloudinary account

## 📋 Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/rokeshramesh06-lgtm/hotels.git
cd hotels
```

### 2. Install Dependencies

```bash
npm run install-all
```

### 3. Configure Environment Variables

#### Backend (.env)

Create `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/hotels
PORT=5000
JWT_SECRET=your-secure-secret-key-change-in-production
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
NODE_ENV=development
```

#### Frontend (.env)

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Development Servers

```bash
npm run dev
```

This starts both backend (port 5000) and frontend (port 5173) concurrently.

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t hotel-restaurant-finder .
```

### Run Container

```bash
docker run -p 5000:5000 -p 5173:5173 --env-file .env hotel-restaurant-finder
```

## ☁️ Cloud Deployment

### Heroku Deployment

```bash
# Install Heroku CLI
# Then:
heroku login
heroku create hotel-restaurant-finder
git push heroku main
```

### AWS Deployment

1. Create EC2 instance (Ubuntu 20.04)
2. SSH into instance
3. Install Node.js and npm
4. Clone repository
5. Configure environment variables
6. Install PM2: `npm install -g pm2`
7. Start app: `pm2 start npm --name "hotels" -- run dev`

### Vercel/Netlify (Frontend Only)

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables
5. Deploy

## 📊 Database Setup

### Local MongoDB

```bash
# Install MongoDB
# Start MongoDB service
mongod
```

### MongoDB Atlas (Cloud)

1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Add to `.env`: `MONGODB_URI=<connection-string>`

## 🔒 Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Enable HTTPS
- [ ] Set up CORS properly
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting
- [ ] Set up firewall rules
- [ ] Use strong MongoDB passwords
- [ ] Enable authentication for APIs
- [ ] Set up API rate limiting
- [ ] Use CSRF protection tokens

## 📈 Performance Optimization

1. **Enable Caching**: Implement Redis caching for restaurant data
2. **Database Indexing**: Ensure all frequently queried fields are indexed
3. **CDN**: Use Cloudinary CDN for images
4. **Lazy Loading**: Implement lazy loading for restaurant lists
5. **Pagination**: Implement pagination for reviews and listings

## 🧪 Testing

### Run Tests

```bash
npm run test
```

### Coverage Report

```bash
npm run test:coverage
```

## 📝 Logging & Monitoring

Add winston or bunyan for logging:

```bash
npm install winston
```

## 🚨 Common Issues & Solutions

### MongoDB Connection Error
- Check MongoDB is running
- Verify connection string
- Check firewall/network access

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### CORS Errors
- Check backend CORS settings
- Verify frontend API URL
- Check authentication headers

## 📞 Support & Troubleshooting

For issues:
1. Check logs: `npm run dev` output
2. Check browser console for frontend errors
3. Use Postman to test API endpoints
4. Verify all environment variables are set
