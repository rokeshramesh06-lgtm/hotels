# Hotel & Restaurant Finder Website

A comprehensive full-stack web application for discovering, comparing, and booking hotels and restaurants with AI-powered recommendations.

## 🌟 Key Features

### 1. 📍 Nearby Hotels
- GPS-based location detection
- Interactive map view with nearby hotels
- Distance calculation

### 2. 🍽️ Digital Menu
- Complete menu with categories
- Veg/Non-Veg labels
- High-quality food images

### 3. 💰 Price Information
- Item-wise pricing
- Tax calculations
- Combo meal prices

### 4. 🍛 Quantity & Serving Size
- Weight information
- Serving portions
- Portion sizes (Small, Medium, Large)

### 5. ⭐ Food Quality Ratings
- Taste, Hygiene, Freshness ratings
- Value for money rating
- Overall customer rating

### 6. 📷 Food Images
- High-resolution photos
- Multiple images per dish

### 7. 🔍 Smart Search
- Search by hotel/restaurant name
- Search by food item
- Search by cuisine type

### 8. 🎯 Advanced Filters
- Budget filtering
- Veg/Non-Veg filter
- Open now status
- AC availability
- Family-friendly options
- Top-rated
- Distance range

### 9. 🗺️ Google Maps Integration
- Real-time location tracking
- Route navigation
- Distance and travel time

### 10. 📝 Customer Reviews
- Star ratings
- Written reviews
- Customer photos

### 11. ❤️ Favorites
- Save restaurants
- Save favorite dishes

### 12. 🎁 Offers & Discounts
- Current promotions
- Combo deals
- Festival discounts

### 13. 📞 Contact Information
- Phone numbers
- WhatsApp integration
- Business hours
- Address

### 14. 📅 Table Booking
- Reserve tables
- Date & time selection
- Guest count

### 15. 🛵 Online Ordering
- Food delivery
- Pickup option
- Real-time tracking

### 16. ⏱️ Waiting Time
- Preparation time estimates
- Crowd levels
- Table availability

### 17. 🤖 AI Food Recommendation
- Budget-based suggestions
- Family meal packages
- Healthy options
- Popular dish recommendations

### 18. 📊 Food Comparison
- Compare dishes across restaurants
- Price comparison
- Quality metrics
- Rating comparison

### 19. 👨‍💼 Restaurant Owner Dashboard
- Menu management
- Price updates
- Image uploads
- Offer management
- Review responses

### 20. 👤 User Profile
- Order history
- Reviews and ratings
- Saved restaurants
- Favorite foods

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + Material-UI
- **State Management**: Context API + Redux Toolkit
- **Maps**: Google Maps API with React-Google-Maps
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Image Upload**: Cloudinary integration

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **API Documentation**: Swagger/OpenAPI
- **File Upload**: Multer
- **AI/ML**: TensorFlow.js for recommendations

### DevOps
- **Package Manager**: npm (Monorepo with workspaces)
- **Version Control**: Git
- **Environment**: .env configuration
- **API Testing**: Postman collection included

## 📁 Project Structure

```
hotels/
├── frontend/                 # React application
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── context/         # Context API
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # Express server
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # MongoDB schemas
│   │   ├── middleware/      # Auth, validation
│   │   ├── server.ts
│   │   └── config.ts
│   ├── package.json
│   └── .env.example
├── package.json             # Monorepo root
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm 7+
- MongoDB 4.4+
- Google Maps API Key
- Cloudinary account (for image hosting)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd hotels
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Configure environment variables**
   - Copy `backend/.env.example` to `backend/.env`
   - Add your MongoDB URI, JWT secret, Google Maps API key, etc.

4. **Start development servers**
   ```bash
   npm run dev
   ```

   The application will be available at:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 API Documentation

API endpoints are documented in the `backend/docs` folder. Start the backend server and visit `http://localhost:5000/api/docs` for Swagger UI.

## 🔐 Authentication

- User registration and login with JWT
- OAuth integration (Google, GitHub)
- Role-based access control (User, Restaurant Owner, Admin)

## 📊 Database Models

- **User** - Customer accounts with profiles
- **Restaurant** - Restaurant information and hours
- **Menu** - Restaurant menus and categories
- **Food** - Food items with details
- **Review** - Customer reviews and ratings
- **Booking** - Table reservations
- **Order** - Online orders
- **Favorites** - Saved restaurants/dishes

## 🧪 Testing

```bash
npm run test          # Run tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

## 📦 Build & Deployment

```bash
npm run build         # Build frontend and backend
npm start            # Start production server
```

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add AmazingFeature'`)
3. Push to branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@hotelrestaurantfinder.com or open an issue in the repository.

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Real-time chat with restaurants
- [ ] AI-powered voice ordering
- [ ] Augmented Reality menu
- [ ] Social features (share meals, connect foodies)
- [ ] Restaurant analytics dashboard
- [ ] Integration with payment gateways
- [ ] Multi-language support
