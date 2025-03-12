---

# ⏰🌤️ Time, Location, and Weather App (React + Vite)

## Overview

This is a simple **React + Vite** application that displays the **current time**, **user's location**, and **weather information**. It is designed as a **beginner-friendly exercise** to explore core React concepts and working with external APIs like Geolocation and Weather APIs.

---

## 🚀 Project Goals

- Learn how to set up a React project with **Vite**.
- Practice using **React hooks** (`useState`, `useEffect`).
- Fetch and display **real-time data** using **APIs**.
- Learn about **component-based architecture**.
- Understand how to manage **API keys and environment variables** securely.

---

## ✨ Features

- ⏲️ **Live updating time** component.
- 📍 **Auto-detect user location** via Geolocation API.
- 🌦️ **Weather information** including temperature and description using OpenWeatherMap or any similar API.

---

## 🗂️ Project Structure

```
time-weather-app/
│
├── public/
│   └── vite.svg             # Default Vite asset (replaceable)
│
├── src/
│   ├── assets/              # Folder for images and static assets
│   ├── App.jsx              # Main App component
│   ├── App.css              # App styling
│   ├── index.css            # Global styles
│   ├── main.jsx             # React DOM rendering
│
├── .gitignore               # Files and folders to ignore in git
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Exact dependency tree
├── vite.config.js           # Vite configuration
├── index.html               # App HTML entry point
└── eslint.config.js         # Linting configuration
```

---

## ⚙️ Setup and Installation

### Prerequisites

- Node.js (v16+ recommended)
- npm (comes with Node.js)
- Weather API Key (e.g., from [OpenWeatherMap](https://openweathermap.org/api))

### Steps to Run

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/time-weather-app.git
cd time-weather-app
```

2. **Install dependencies:**

```bash
npm install
```

3. **Add your API key:**

- Create a `.env` file in the root directory:
```bash
touch .env
```

- Add the following line to `.env`:
```
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

4. **Run the app in development mode:**

```bash
npm run dev
```

5. **Open the app:**

Visit `http://localhost:5173` in your browser.

---

## 🔑 APIs and Tools Used

- **React.js** (via Vite) — Frontend library
- **Vite** — Fast build tool and development server
- **Geolocation API** — Detect user coordinates
- **OpenWeatherMap API** — Fetch current weather data
- **JavaScript ES6+** — Functional code

---

## 📚 Key Learnings

- Setting up a **React** app with **Vite**.
- Making **asynchronous API calls** using `fetch`.
- Using **hooks** for state and lifecycle management.
- Dynamically updating UI based on API data.
- Handling **environment variables** securely in Vite.

---

## 💡 Possible Improvements

- 🌐 Add error handling for denied location access or failed API calls.
- 🎨 Improve styling and responsiveness with frameworks like Tailwind or Material UI.
- 🌍 Allow users to manually search for different locations.
- 💾 Cache data for better performance.

---

## 📝 License

This project is for educational purposes and open to modifications and extensions. 

---

## 🙌 Acknowledgments

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [OpenWeatherMap](https://openweathermap.org/)
- [MDN Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

---

Let me know if you want to include a **code example** of how to structure components like `TimeDisplay`, `LocationDisplay`, and `WeatherDisplay`!
