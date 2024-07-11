import React from 'react';
import { Carousel, Card, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../styles/Home.css';
import coverImage1 from './cover-1.jpg';
import coverImage2 from './cover-2.jpg';
import coverImage3 from './cover-3.jpg';

const Home = () => {
  return (
    <div>
      <Carousel fade className="carousel-container">
        <Carousel.Item>
          <img
            className="d-block w-100 carousal-item"
            src={coverImage1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Professional General Service</h3>
            <p>Experience the best General Service.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousal-item"
            src={coverImage2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Oli Cleaning</h3>
            <p>Deep interior cleaning for a fresh feel inside your bike.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousal-item"
            src={coverImage3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Water Wash</h3>
            <p>Professional detailing services for a showroom finish.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <section className="services-section padding-large text-center">
        <Container>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h2 className="section-title heading-color">Our Services</h2>
            <Row className="service-list">
              <Col md={4} className="service-item">
                <Link to="/customer-dashboard">
                  <Card>
                    <Card.Body>
                      <Card.Title>General Service</Card.Title>
                      <Card.Text>
                        Complete exterior wash with premium products.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col md={4} className="service-item">
                <Link to="/customer-dashboard">
                  <Card>
                    <Card.Body>
                      <Card.Title>Oli Cleaning</Card.Title>
                      <Card.Text>
                        Deep interior cleaning for a fresh feel inside your bike.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col md={4} className="service-item">
                <Link to="/customer-dashboard">
                  <Card>
                    <Card.Body>
                      <Card.Title>Water Wash</Card.Title>
                      <Card.Text>
                        Professional detailing services for a showroom finish.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>

      <footer id="footer" className="text-center">
        <Container>
          <p>&copy; 2024 Turbo Car Wash. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
