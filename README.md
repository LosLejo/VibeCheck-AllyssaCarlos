# VibeCheck 411L 🎉

A full-stack Node.js web application that delivers random fortunes, jokes, mood vibes, and an interactive smash counter. Built as a learning project for CPE 411L to demonstrate client-server communication, RESTful API design, and modern web development practices.

## 🌟 Features

### Interactive Frontend
- 🔮 **Fortune Cookie** - Get random motivational programming fortunes
- 😂 **Joke Generator** - Fetch random developer jokes
- 😄 **Vibe Check** - Check your mood (happy, tired, stressed)
- 💥 **Smash Counter** - Interactive button with animation effects
- 🕵️ **Secret Code** - Unlock hidden messages with custom codes
- 📋 **Share Button** - Copy any output to clipboard
- 🌙 **Dark Mode** - Toggle between light and dark themes with localStorage persistence

### Backend API
- **RESTful API** with full CRUD operations
- **Modular route structure** for maintainability
- **Error handling middleware** for consistent error responses
- **Input validation** with proper HTTP status codes
- **CORS enabled** for cross-origin requests

## 📁 Project Structure

```
VibeCheck-AllyssaCarlos/
├── backend/
│   ├── routes/
│   │   ├── fortune.js      # Fortune endpoints with CRUD
│   │   ├── jokes.js         # Joke endpoints with CRUD
│   │   ├── vibe.js          # Vibe/mood endpoints with CRUD
│   │   ├── smash.js         # Smash counter endpoints
│   │   └── secret.js        # Secret code endpoint
│   ├── middleware/
│   │   ├── errorHandler.js  # Global error handling
│   │   └── asyncHandler.js  # Async route wrapper
│   ├── index.js             # Main server file
│   └── package.json         # Backend dependencies
├── frontend/
│   ├── index.html           # Main HTML structure
│   ├── app.js               # Frontend JavaScript logic
│   └── styles.css           # CSS styling with dark mode
└── package.json             # Root package file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LosLejo/VibeCheck-AllyssaCarlos.git
   cd VibeCheck-AllyssaCarlos
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Start the backend server**
   ```bash
   node index.js
   ```
   Server will run at `http://localhost:3000`

4. **Open the frontend**
   - Navigate to the `frontend` folder
   - Open `index.html` in your web browser
   - Or use a local server like Live Server (VS Code extension)

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Fortune Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/fortune` | Get random fortune |
| GET | `/fortune/all` | Get all fortunes |
| GET | `/fortune/:id` | Get specific fortune by ID |
| POST | `/fortune` | Add new fortune (body: `{ "text": "..." }`) |
| PUT | `/fortune/:id` | Update fortune (body: `{ "text": "..." }`) |
| DELETE | `/fortune/:id` | Delete fortune |

### Joke Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/joke` | Get random joke |
| GET | `/joke/all` | Get all jokes |
| GET | `/joke/:id` | Get specific joke by ID |
| POST | `/joke` | Add new joke (body: `{ "text": "..." }`) |
| PUT | `/joke/:id` | Update joke (body: `{ "text": "..." }`) |
| DELETE | `/joke/:id` | Delete joke |

### Vibe Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/vibe?mood={mood}` | Get vibe for mood (happy/tired/stressed) |
| GET | `/vibe/all` | Get all available vibes |
| POST | `/vibe` | Add new vibe (body: `{ "mood": "...", "emoji": "...", "message": "..." }`) |
| PUT | `/vibe/:mood` | Update vibe (body: `{ "emoji": "...", "message": "..." }`) |
| DELETE | `/vibe/:mood` | Delete vibe |

### Smash Counter Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/smash` | Increment counter by 1 |
| GET | `/smashes` | Get current counter value |
| PUT | `/smash/set` | Set counter to specific value (body: `{ "value": 100 }`) |
| DELETE | `/smash` | Reset counter to 0 |

### Secret Endpoint

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/secret?code={code}` | Get secret message if code is correct (code: `411L`) |

## 🎨 Frontend Features

### Dark Mode
- Click the 🌙/☀️ button in the header
- Preference saved to localStorage
- Smooth color transitions

### Secret Code
- Enter custom codes in the input field
- Press Enter or click Unlock
- Try code: `411L`

### Share Functionality
- Click the 📋 Share button
- Copies current output to clipboard
- Shows confirmation feedback

### Error Handling
- Displays user-friendly error messages
- Shows loading states during API calls
- Handles offline/connection errors

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js v5.2.1** - Web framework
- **CORS v2.8.5** - Cross-origin resource sharing

### Frontend
- **Vanilla JavaScript** - No frameworks
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients, animations, flexbox/grid

## 🎯 Learning Objectives

This project demonstrates:
- ✅ RESTful API design principles
- ✅ Client-server architecture
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Error handling and validation
- ✅ Modular code organization
- ✅ Middleware implementation
- ✅ Async/await patterns
- ✅ DOM manipulation
- ✅ Fetch API usage
- ✅ LocalStorage for persistence
- ✅ Responsive design principles

## 🔧 Development Features

### Route Modularity
Each route is in its own file for easy maintenance and testing.

### Error Handling
- Global error middleware catches all errors
- Consistent JSON error responses
- Proper HTTP status codes (400, 404, 500)

### Input Validation
- Required field checks
- Type validation
- Empty string protection
- ID format validation

### Async Wrapper
Automatic error catching for async routes without repetitive try-catch blocks.

## 📝 API Response Format

### Success Response
```json
{
  "fortune": "Your next commit will be clean and meaningful.",
  "joke": "Why did the developer go broke? Because they used up all their cache.",
  "mood": "happy",
  "emoji": "😄",
  "message": "Keep going - you're shipping greatness!",
  "smashes": 42
}
```

### Error Response
```json
{
  "success": false,
  "error": "Fortune not found",
  "path": "/api/fortune/999",
  "method": "GET"
}
```

## 🌐 Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## 📚 Course Information

**Course:** CPE 411L - Computer Engineering Laboratory  
**Project:** Node.js Activity - Full Stack Web Application  
**Repository:** [VibeCheck-AllyssaCarlos](https://github.com/LosLejo/VibeCheck-AllyssaCarlos)

## 👥 Contributors

- Allyssa
- Carlos

## 📄 License

ISC License

## 🐛 Known Limitations

- Data is stored in memory (resets on server restart)
- No database persistence
- Single-user (no authentication)
- Counter is global (not per-user)

## 🚀 Future Enhancements

- Add database (MongoDB/PostgreSQL) for persistence
- User authentication and personalization
- Real-time updates with WebSockets
- API rate limiting
- Unit and integration tests
- Deployment to cloud platform (Render, Railway, Vercel)

## 📞 Support

For issues or questions, please open an issue on the [GitHub repository](https://github.com/LosLejo/VibeCheck-AllyssaCarlos/issues).

---

Made with ❤️ for CPE 411L