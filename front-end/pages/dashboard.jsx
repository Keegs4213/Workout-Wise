// Dashboard.jsx
import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Header from '../app/components/Header';
import styles from '../app/globals.module.css';
import { Navbar, Nav } from 'react-bootstrap';
import '../public/bootstrap.min.css';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import BottomNavBar from '../app/components/Navbar';

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

  const goal = () => {
    typeof window !== 'undefined' ? localStorage.getItem("fitnessGoal") : '';
  };
  
  if (typeof window !== 'undefined') {
    ChartJS.register(ArcElement);
  }

  return (
    <main style={{ height: '100vh' }}>
      <Header />
      <Container>
        <h1 className={styles.dashboardTitle}>Dashboard</h1>
        <Row>
          <Col md={6}>
            <h2 className={styles.dashboardSubtitle}>Your Progress</h2>
            <div>
              {typeof window !== 'undefined' && <Chart data={data} />}
            </div>
          </Col>
          <Col md={6}>
            <h2 className={styles.dashboardSubtitle}>Your Goals</h2>
            {goal}
          </Col>
        </Row>
      </Container>
      <BottomNavBar/>
    </main>
  );
}
