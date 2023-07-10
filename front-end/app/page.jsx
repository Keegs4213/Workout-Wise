// page.tsx
"use client";
import Image from "next/image";
import { Button } from "react-bootstrap";
import Header from "./components/Header";
import styles from "./globals.css";
import "../public/bootstrap.min.css";

export default function Home() {
  return (
    <main styles={{
      height: '100vh'
    }}>
      <container>
        <div>
          <Header />
          <Image
            className={styles.logo}
            src="/workout-wise-logo.svg" // replace with the path of your logo
            alt="Workout Wise Logo"
            width={180}
            height={37}
            priority
          />
          <div />
        </div>

        <div>
          <p>Join us today and become your best self.</p>
          <Image
            src="/exercise-image.jpg" // replace with the path of your exercise image
            alt="Exercise Image"
            width={500}
            height={300}
            priority
          />
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <Button variant="primary" href="/login">
              Get Started
            </Button>
          </div>
        </div>
      </container>
    </main>
  );
}
