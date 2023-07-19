import React from "react";
import "./scss/style.scss";
import { FaHouseChimney } from "react-icons/fa6";
import { FaCloud } from "react-icons/fa6";
import { FaShareNodes } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { Container, Button, Form, InputGroup } from "react-bootstrap";

const Card = () => {
  return (
    <Container className="cards-all">
      <div className="cards-left">
        <div className="button-up">
          <div className="home">
            <FaHouseChimney />
            <p>Home</p>
          </div>
          <div className="forecast">
            <FaCloud />
            <p>Forecast</p>
          </div>
          <div className="share">
            <FaShareNodes />
            <p>Share</p>
          </div>
        </div>
        <div className="card-bottom">
          <div className="icon">
            <i class="wi wi-day-haze"></i>
          </div>

          <p className="icon-text">MOSTLY SUNNY</p>
          <p className="degrees">29°C</p>

          <div className="search">
            <InputGroup className="mb-3">
              <Button variant="success" id="button-addon1">
                <FaMagnifyingGlass />
              </Button>
              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </div>

          <p>SAT, 2 JULY 2015</p>
          <p>Copanhagen</p>
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
                <i class="wi wi-rain"></i>
              </div>
              <p>24°C</p>
              <p>Sun. 3 July</p>
            </div>
            <div>
              <div className="icon">
                <i class="wi wi-rain-mix"></i>
              </div>
              <p>32°C</p>
              <p>Mon. 4 July</p>
            </div>
            <div>
              <div className="icon">
                <i class="wi wi-strong-wind"></i>
              </div>
              <p>28°C</p>
              <p>Sat. 5 July</p>
            </div>
          </div>
          <div className="second-three-day">
            <div>
              <div className="icon">
                <i class="wi wi-night-alt-cloudy"></i>
              </div>
              <p>21°C</p>
              <p>Wed. 6 July</p>
            </div>
            <div>
              <div className="icon">
                <i class="wi wi-day-sunny"></i>
              </div>
              <p>25°C</p>
              <p>Thu. 7 July</p>
            </div>
            <div>
              <div className="icon">
                <i class="wi wi-rain"></i>
              </div>
              <p>18°C</p>
              <p>Fri. 8 July</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Card;
