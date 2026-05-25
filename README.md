# ☀️ Weather Dashboard

A beautiful, fully-functional weather dashboard that fetches real-time weather data from the OpenWeatherMap API. Built with vanilla HTML, CSS, and JavaScript.

## ✨ Features

### Current Weather
- **Real-time data** from OpenWeatherMap API
- **Temperature display** with feels-like information
- **Weather description** with animated icons
- **Location information** showing city and country

### Weather Details
- 📊 **Humidity** - Current humidity percentage
- 💨 **Wind Speed** - Wind speed in m/s
- 🔍 **Pressure** - Atmospheric pressure in hPa
- 👁️ **Visibility** - Visibility distance in km
- 🌧️ **Precipitation** - Rain amount in mm
- ☀️ **UV Index** - Sun exposure index

### 5-Day Forecast
- Daily weather predictions
- Temperature and weather conditions
- Beautiful animated cards

### Search & Location
- 🔍 **Search by City** - Enter any city name worldwide
- 📍 **Current Location** - Auto-detect location using geolocation
- 🌍 **Global Coverage** - Works for any city in the world

### User Interface
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Error handling and loading states
- Beautiful gradient background
- Interactive cards with hover effects

## 🚀 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Dynamic functionality
- **OpenWeatherMap API** - Real weather data
- **Font Awesome** - Weather and UI icons

## 📋 Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- OpenWeatherMap API key (free tier available)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saad-malik48/Weather-Dashboard.git
   cd Weather-Dashboard
   ```

2. **Get an API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for free
   - Get your API key from the account settings

3. **Update API Key**
   - Open `script.js`
   - Replace `e06f13789cff4cc6b0b141a2242512a6` with your API key
   ```javascript
   const API_KEY = 'your-api-key-here';
   ```

4. **Open in Browser**
   - Open `index.html` in your web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000
     ```

## 📖 How to Use

1. **Search by City**
   - Enter a city name in the search box
   - Click the search button or press Enter
   - Weather data will load automatically

2. **Use Current Location**
   - Click the "Current Location" button
   - Allow browser geolocation access
   - Weather for your current location will display

3. **View Forecast**
   - Scroll down to see the 5-day forecast
   - Each card shows daily weather predictions

4. **Explore Details**
   - Hover over detail cards for interactive effects
   - Click on welcome suggestions (London, New York, Tokyo)

## 📱 Responsive Design

- **Desktop**: Full layout with all features
- **Tablet**: Optimized grid layout
- **Mobile**: Single column layout with touch-friendly buttons

## 🎨 Customization

### Change Color Scheme
Edit the gradient colors in `styles.css`:
```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Change Temperature Unit
Modify in `script.js`:
```javascript
// Change 'metric' to 'imperial' for Fahrenheit
`${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
```

## 📡 API Endpoints Used

1. **Current Weather**
   ```
   https://api.openweathermap.org/data/2.5/weather
   ```

2. **5-Day Forecast**
   ```
   https://api.openweathermap.org/data/2.5/forecast
   ```

3. **UV Index**
   ```
   https://api.openweathermap.org/data/2.5/uvi
   ```

## 🐛 Error Handling

- **City Not Found** - Clear error message if city doesn't exist
- **Network Errors** - Graceful handling of connection issues
- **Geolocation Denied** - User-friendly error messages
- **Invalid Input** - Validation for empty searches

## 📝 Example Usage

```javascript
// Search for weather
await fetchWeatherData('London');

// Get weather by coordinates
await fetchWeatherByCoordinates(latitude, longitude);
```

## 🔐 API Key Security

**Note**: The API key in this repository is for demonstration only. For production:
1. Use environment variables
2. Use a backend proxy
3. Keep your API key secure

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 👨‍💻 Author

**Saad Malik**
- GitHub: [@saad-malik48](https://github.com/saad-malik48)
- Weather Dashboard: [GitHub Repository](https://github.com/saad-malik48/Weather-Dashboard)

## 🌟 Features Roadmap

- [ ] Air quality index (AQI)
- [ ] Severe weather alerts
- [ ] Weather history/charts
- [ ] Multiple city comparison
- [ ] Dark/Light theme toggle
- [ ] Favorite cities save
- [ ] Weather notifications
- [ ] Pollen count information

## 📚 Resources

- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [Font Awesome Icons](https://fontawesome.com)
- [MDN Web Docs](https://developer.mozilla.org)
- [CSS Tricks](https://css-tricks.com)

---

**Last Updated**: May 2026

Made with ❤️ and ☀️