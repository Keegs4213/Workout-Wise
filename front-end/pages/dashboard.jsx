// Dashboard.jsx
import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import Header from '../app/components/Header';
import styles from '../app/globals.css';
import { Navbar, Nav } from 'react-bootstrap';
import '../public/bootstrap.min.css';

// Use dynamic import for Chart
const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Doughnut), { ssr: false });

export default function Dashboard() {
  const data = {
    labels: [
      'Water Intake',
      'Weight'
    ],
    datasets: [{
      data: [300, 50],
      backgroundColor: [
        '#36A2EB',
        '#FF6384'
      ],
      hoverBackgroundColor: [
        '#36A2EB',
        '#FF6384'
      ]
    }]
  };

  return (
    <main style={{ height: '100vh' }}>
      <Header />
      <Image
        className={styles.logo}
        src="/workout-wise-logo.svg" // replace with the path of your logo
        alt="Workout Wise Logo"
        width={180}
        height={37}
        priority
      />
      <div>
        <Chart data={data} />
      </div>
      <Navbar fixed="bottom" bg="light" variant="light">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
      </Navbar>
    </main>
  );
}
