// page.jsx
"use client";
import Image from "next/image";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import Header from "./components/Header";
import styles from "./globals.css";
import "../public/bootstrap.min.css";

export default function Home() {
  return (
    <main>
      <Container>
        <Header />
        <Row className="justify-content-center align-items-center">
          <Col xs={12} >
            <p className={styles.introText}>Join us today and become your best self.</p>
            <Card border="light" className={`shadow mb-4 ${styles.heroImageCard}`}>
              <Card.Img 
                as={Image} 
                variant="top" 
                src="/../public/HomePage.jpg"
                alt="Exercise Image"
                width={500}
                height={450}
                priority
              />
            </Card>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <Button variant="primary" href="/login" className={styles.ctaButton}>
                Get Started
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
