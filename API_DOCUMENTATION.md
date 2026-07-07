# 📚 API Documentation

Base URL: `http://localhost:5000/api`

All endpoints require authentication headers except `/auth/register` and `/auth/login`

```
Authorization: Bearer <token>
```

## 🔐 Authentication Endpoints

### Register User

**POST** `/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "role": "user" // or "restaurant_owner"
}
```

**Response** (201):
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login User

**POST** `/auth/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (200): Same as register

### Verify Token

**GET** `/auth/verify`

**Response** (200):
```json
{
  "message": "Token is valid",
  "user": { ... }
}
```

## 🏨 Restaurant Endpoints

### Get Nearby Restaurants

**GET** `/restaurants/nearby?latitude=40.7128&longitude=-74.006&radius=5`

**Response** (200):
```json
[
  {
    "_id": "restaurant_id",
    "name": "Restaurant Name",
    "description": "Description",
    "averageRating": 4.5,
    "totalReviews": 25,
    "location": {
      "latitude": 40.7128,
      "longitude": -74.006,
      "address": "Address",
      "city": "City"
    },
    "cuisine": ["Indian", "Chinese"],
    "isAC": true,
    "isFamilyFriendly": true
  }
]
```

### Search Restaurants

**GET** `/restaurants/search?query=pizza&cuisine=Italian&minBudget=100&maxBudget=500`

**Response** (200): Same as nearby

### Get Top Rated Restaurants

**GET** `/restaurants/top-rated`

**Response** (200): Array of restaurants sorted by rating

### Get Restaurant Details

**GET** `/restaurants/:id`

**Response** (200): Single restaurant with menu and reviews populated

### Create Restaurant (Owner Only)

**POST** `/restaurants`

```json
{
  "name": "My Restaurant",
  "description": "Description",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.006,
    "address": "123 Main St",
    "city": "New York"
  },
  "cuisine": ["Indian"],
  "phoneNumber": "1234567890",
  "businessHours": {
    "Monday": { "open": "10:00", "close": "22:00" }
    // ... other days
  },
  "isAC": true,
  "isFamilyFriendly": true
}
```

### Update Restaurant (Owner Only)

**PUT** `/restaurants/:id`

Same request body as create

## 🍽️ Menu & Food Endpoints

### Get Restaurant Menu

**GET** `/menu/:restaurantId`

**Response** (200):
```json
{
  "_id": "menu_id",
  "name": "Restaurant Menu",
  "categories": [...],
  "foods": [ ... ]
}
```

### Search Foods

**GET** `/menu/search/all?query=pizza&isVegetarian=false`

**Response** (200): Array of food items

### Get Foods by Category

**GET** `/menu/:restaurantId/:category`

**Response** (200): Array of foods in category

### Add Food Item (Owner Only)

**POST** `/menu/:restaurantId/food`

```json
{
  "name": "Biryani",
  "description": "Delicious rice dish",
  "category": "Main Course",
  "isVegetarian": false,
  "price": 250,
  "tax": 5,
  "weight": "500g",
  "servingSize": "Medium",
  "servesHowMany": 2,
  "images": ["url1", "url2"]
}
```

### Update Food Item (Owner Only)

**PUT** `/menu/food/:foodId`

Same request body as add

## ⭐ Review Endpoints

### Create Review

**POST** `/reviews`

```json
{
  "restaurantId": "restaurant_id",
  "foodId": "food_id",
  "rating": 4,
  "tasteRating": 4,
  "hygieneRating": 5,
  "freshnessRating": 4,
  "valueForMoneyRating": 4,
  "reviewText": "Great food and service!",
  "images": []
}
```

### Get Restaurant Reviews

**GET** `/reviews/restaurant/:restaurantId?page=1&limit=10`

**Response** (200):
```json
{
  "reviews": [ ... ],
  "pagination": {
    "total": 100,
    "page": 1,
    "pages": 10
  }
}
```

### Get Food Reviews

**GET** `/reviews/food/:foodId`

**Response** (200): Array of reviews

### Respond to Review (Owner Only)

**PUT** `/reviews/:reviewId/respond`

```json
{
  "response": "Thank you for your feedback!"
}
```

## 📅 Booking Endpoints

### Create Booking

**POST** `/bookings`

```json
{
  "restaurantId": "restaurant_id",
  "bookingDate": "2024-07-15",
  "numberOfGuests": 4,
  "bookingTime": "19:00",
  "specialRequests": "Window seat preferred"
}
```

### Get User Bookings

**GET** `/bookings`

**Response** (200): Array of user's bookings

### Get Restaurant Bookings (Owner Only)

**GET** `/bookings/restaurant/:restaurantId`

### Update Booking Status (Owner Only)

**PUT** `/bookings/:bookingId/status`

```json
{
  "status": "confirmed" // or cancelled, completed
}
```

### Cancel Booking

**PUT** `/bookings/:bookingId/cancel`

## 🛒 Order Endpoints

### Create Order

**POST** `/orders`

```json
{
  "restaurantId": "restaurant_id",
  "items": [
    {
      "food": "food_id",
      "quantity": 2
    }
  ],
  "orderType": "delivery", // or "pickup"
  "deliveryAddress": "123 Main St"
}
```

### Get User Orders

**GET** `/orders`

### Get Restaurant Orders (Owner Only)

**GET** `/orders/restaurant/:restaurantId`

### Update Order Status (Owner Only)

**PUT** `/orders/:orderId/status`

```json
{
  "status": "ready" // or confirmed, preparing, delivered, cancelled
}
```

## 👤 User Profile Endpoints

### Get User Profile

**GET** `/users/profile`

### Update User Profile

**PUT** `/users/profile`

```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.006
  }
}
```

### Get User Favorites

**GET** `/users/favorites`

### Add Favorite Restaurant

**POST** `/users/favorites/restaurant`

```json
{
  "restaurantId": "restaurant_id"
}
```

### Remove Favorite Restaurant

**DELETE** `/users/favorites/restaurant/:restaurantId`

### Add Favorite Dish

**POST** `/users/favorites/dish`

```json
{
  "foodId": "food_id"
}
```

### Remove Favorite Dish

**DELETE** `/users/favorites/dish/:foodId`

## 🧪 Testing with Postman

1. Import collection from `postman_collection.json`
2. Set `{{base_url}}` to `http://localhost:5000/api`
3. After login, set token in `Authorization` header
4. Run requests

## ❌ Error Responses

All errors follow this format:

```json
{
  "error": "Error message",
  "errors": [
    {
      "msg": "Field validation message"
    }
  ]
}
```

**Common Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Server Error
