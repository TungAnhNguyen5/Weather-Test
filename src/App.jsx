import React, { useState, useEffect } from 'react';
import './App.css';

const TimeWeatherApp = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeZoneOffset, setTimeZoneOffset] = useState(-5); // Default Toronto offset
  const [isDST, setIsDST] = useState(true);
  const [weather, setWeather] = useState({
    temperature: null,
    condition: '',
    humidity: null,
    windSpeed: null,
    icon: '',
  });
  const [location, setLocation] = useState('Toronto');
  const [loading, setLoading] = useState(false);
  const [inputLocation, setInputLocation] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const canadianLocations = [
    { name: 'Toronto', offset: -5 },
    { name: 'Montreal', offset: -5 },
    { name: 'Vancouver', offset: -8 },
    { name: 'Calgary', offset: -7 },
    { name: 'Edmonton', offset: -7 },
    { name: 'Ottawa', offset: -5 },
    { name: 'Winnipeg', offset: -6 },
    { name: 'Quebec City', offset: -5 },
    { name: 'Halifax', offset: -4 },
    { name: "St. John's", offset: -3.5 },
  ];

  useEffect(() => {
    detectDST();
    fetchWeather('Toronto');
  }, []);

  useEffect(() => {
    updateLocalTime();
  }, [timeZoneOffset, isDST]);

  useEffect(() => {
    const timer = setInterval(() => {
      updateLocalTime();
    }, 1000);
    return () => clearInterval(timer);
  }, [timeZoneOffset, isDST]);

  const detectDST = () => {
    const now = new Date();
    const january = new Date(now.getFullYear(), 0, 1).getTimezoneOffset();
    const july = new Date(now.getFullYear(), 6, 1).getTimezoneOffset();
    setIsDST(now.getTimezoneOffset() < Math.max(january, july));
  };

  const getEffectiveOffset = () => (isDST ? timeZoneOffset + 1 : timeZoneOffset);

  const updateLocalTime = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const locationTime = new Date(utc + 3600000 * getEffectiveOffset());
    setCurrentTime(locationTime);
  };

  const formatTime = (date) =>
    `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

  const formatDate = (date) =>
    date.toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const getCoordinates = async (city) => {
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`Could not find coordinates for ${city}`);
    }

    return {
      latitude: geoData.results[0].latitude,
      longitude: geoData.results[0].longitude,
    };
  };

  const fetchWeather = async (selectedLocation) => {
    const locationName = selectedLocation || inputLocation || 'Toronto';
    setLoading(true);
    setError('');

    try {
      const locationObj = canadianLocations.find((loc) => loc.name === locationName);
      if (!locationObj) throw new Error(`Location ${locationName} not found`);

      setTimeZoneOffset(locationObj.offset);

      const { latitude, longitude } = await getCoordinates(locationName);

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode,relative_humidity_2m,windspeed_10m&timezone=auto`
      );

      if (!response.ok) throw new Error(`Weather data not available`);

      const data = await response.json();
      const current = data.current;

      setWeather({
        temperature: Math.round(current.temperature_2m),
        condition: getWeatherDescription(current.weathercode),
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.windspeed_10m),
        icon: getWeatherIcon(current.weathercode),
      });

      setLocation(locationName);
      updateLocalTime();
      setLoading(false);
      setShowSuggestions(false);
    } catch (err) {
      setError(`Could not retrieve weather data. ${err.message}`);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputLocation(value);

    if (value.length > 0) {
      const filtered = canadianLocations
        .filter((loc) => loc.name.toLowerCase().startsWith(value.toLowerCase()))
        .map((loc) => loc.name);
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputLocation(suggestion);
    setShowSuggestions(false);
    fetchWeather(suggestion);
  };

  const getWeatherDescription = (code) => {
    const descriptions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      51: 'Drizzle',
      61: 'Light rain',
      65: 'Heavy rain',
      71: 'Snow',
      95: 'Thunderstorm',
    };
    return descriptions[code] || 'Unknown';
  };

  const getWeatherIcon = (code) => {
    const iconMap = {
      0: '01d',
      1: '02d',
      2: '03d',
      3: '04d',
      45: '50d',
      51: '09d',
      61: '10d',
      65: '11d',
      71: '13d',
      95: '11d',
    };
    return iconMap[code] || '50d';
  };

  return (
    <div className="app">
      <h1>Weather & Time in {location}</h1>
      <h2>{formatTime(currentTime)}</h2>
      <h3>{formatDate(currentTime)}</h3>
      <p>{isDST ? 'Daylight Saving Time (DST) Active' : 'Standard Time'}</p>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Condition: {weather.condition}</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Wind Speed: {weather.windSpeed} km/h</p>

      <input
        type="text"
        placeholder="Enter a city"
        value={inputLocation}
        onChange={handleInputChange}
      />

      {showSuggestions && (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => fetchWeather(inputLocation)}>Get Weather</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TimeWeatherApp;
