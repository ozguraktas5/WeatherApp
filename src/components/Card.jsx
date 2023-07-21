import React, { useState, useEffect } from "react";
import "./scss/style.scss";
import { FaHouseChimney } from "react-icons/fa6";
import { FaCloud } from "react-icons/fa6";
import { FaShareNodes } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Container, Button, Form, InputGroup } from "react-bootstrap";
import axios from "axios";

const Card = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState([]);

  const handleChange = (e) => {
    setCity(e.target.value);
  };
  const handleSubmit = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=360656f7fcf64edc9fe130433232007&q=${city}&aqi=yes`
      )

      .then((response) => {
        setWeatherData(response.data);
        localStorage.setItem("weatherData", JSON.stringify(response.data))
      })
      .catch((error) => {
        console.error("Error", error);
      });

    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=360656f7fcf64edc9fe130433232007&q=${city}&days=7&aqi=no&alerts=no`
      )

      .then((response) => {
        setForecastData(response.data.forecast.forecastday.slice(1, 7));
        localStorage.setItem("forecastData", JSON.stringify(response.data.forecast.forecastday.slice(1, 7)))
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  useEffect(() => {
    const savedWeatherData = JSON.parse(localStorage.getItem("weatherData"));
    if (savedWeatherData) {
      setWeatherData(savedWeatherData);
    }
    const savedForecastData = JSON.parse(localStorage.getItem("forecastData"));
    if (savedForecastData) {
      setForecastData(savedForecastData);
    }

    const intervalID = setInterval(() => {
      const date = new Date();
      setCurrentDate(formatDate(date));
    });

    return () => clearInterval(intervalID);
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };
  return (
    <div className="cards-all">
      <div className="cards-left">
        <div className="button-up">
          <Button className="home">
            <FaHouseChimney />
            <p>Home</p>
          </Button>
          <Button className="forecast">
            <FaCloud />
            <p>Forecast</p>
          </Button>
          <Button className="share">
            <FaShareNodes />
            <p>Share</p>
          </Button>
        </div>
        <div className="card-bottom">
          <div className="icon">
            {weatherData.current && weatherData.current.condition && (
              <img src={weatherData.current.condition.icon} alt="icon" />
            )}
          </div>

          <p className="icon-text">
            {weatherData.current && weatherData.current.condition
              ? weatherData.current.condition.text
              : ""}
          </p>
          <p className="degrees">
            {weatherData.current && weatherData.current.temp_c
              ? `${weatherData.current.temp_c}°C`
              : ""}
          </p>

          <div className="search">
            <InputGroup className="mb-3">
              <Button
                className="input-icon"
                variant="success"
                id="button-addon1"
                onClick={handleSubmit}
              >
                <FaMagnifyingGlass />
              </Button>
              <Form.Control
                type="text"
                value={city}
                onChange={handleChange}
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                placeholder="Enter city name..."
              />
            </InputGroup>
          </div>

          <p className="date">{currentDate}</p>
          {weatherData.location && weatherData.location.name && (
            <p className="city">{weatherData.location.name}</p>
          )}
        </div>
      </div>

      <div className="cards-right">
        <div className="weather-up">
          <div className="forecast">
            <FaCloud />
            <p>Forecast</p>
          </div>
        </div>

        <div className="weather-bottom">
          {forecastData.map((dayData, index) => (
            <div key={index} className="days">
              <div className="icon">
                <img src={dayData.day.condition.icon} alt="" />
              </div>
              <p className="degrees">{dayData.day.maxtemp_c}°C</p>
              <p className="date">{dayData.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
