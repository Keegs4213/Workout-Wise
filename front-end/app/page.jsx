// page.jsx
"use client";
import Image from "next/image";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import Header from "./components/Header";
import "../public/bootstrap.min.css";
import styles from "./landing.module.css";
import CyberButtonScreen from "./components/CyberButtonScreen";


export default function Home() {
  return (
    <main>
      <Container className={styles.container}>
      <div
          className={`${styles.backgroundSquare} ${styles.square1}`}
          style={{ top: "10%", left: "5%" }}
        />
        <div
          className={`${styles.backgroundSquare} ${styles.square2}`}
          style={{ top: "60%", left: "60%" }}
        />
        <div
          className={`${styles.backgroundSquare} ${styles.square3}`}
          style={{ top: "60%", left: "20%" }}
        />
        <div
          className={`${styles.backgroundSquare} ${styles.square4}`}
          style={{ top: "10%", left: "40%" }}
        />
        <div
          className={`${styles.backgroundSquare} ${styles.square5}`}
          style={{ top: "10%", left: "75%" }}
        />
        <Header />
        <Row className="justify-content-center align-items-center">
          <Col xs={12}>
            <p className={styles.introText}>
              Join us today and become your best self.
            </p>
            <Card
              border="light"
              className={`shadow mb-4 ${styles.heroImageCard}`}
            >
              {/* <Card.Img
                as={Image}
                variant="top"
                src="/landing.jpg"
                alt="Exercise Image"
                width={500}
                height={450}
                priority
              /> */}
            </Card>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              {/* <Button variant="primary" href="/login" className={styles.ctaButton}>
                Get Started
              </Button> */}
              <CyberButtonScreen href="/login" className={styles.ctaButton} />
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
