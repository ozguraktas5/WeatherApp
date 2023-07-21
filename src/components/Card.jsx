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

  const handleChange = (e) => {
    setCity(e.target.value);
  };
  const handleSubmit = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=360656f7fcf64edc9fe130433232007&q=${city}&aqi=yes`
      )

      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  useEffect(() => {
    const intervalID = setInterval(() => {
      const date = new Date();
      setCurrentDate(formatDate(date));
    }, 1000);

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
    <Container className="cards-all">
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
          <div className="first-three-day">
            <div>
              <div className="icon">
                <i className="wi wi-rain"></i>
              </div>
              <p className="degrees">24°C</p>
              <p className="date">Sun. 3 July</p>
            </div>
            <div>
              <div className="icon">
                <i className="wi wi-rain-mix"></i>
              </div>
              <p className="degrees">32°C</p>
              <p className="date">Mon. 4 July</p>
            </div>
            <div>
              <div className="icon">
                <i className="wi wi-strong-wind"></i>
              </div>
              <p className="degrees">28°C</p>
              <p className="date">Sat. 5 July</p>
            </div>
          </div>
          <div className="second-three-day">
            <div>
              <div className="icon">
                <i className="wi wi-night-alt-cloudy"></i>
              </div>
              <p className="degrees">21°C</p>
              <p className="date">Wed. 6 July</p>
            </div>
            <div>
              <div className="icon">
                <i className="wi wi-day-sunny"></i>
              </div>
              <p className="degrees">25°C</p>
              <p className="date">Thu. 7 July</p>
            </div>
            <div>
              <div className="icon">
                <i className="wi wi-rain"></i>
              </div>
              <p className="degrees">18°C</p>
              <p className="date">Fri. 8 July</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Card;
