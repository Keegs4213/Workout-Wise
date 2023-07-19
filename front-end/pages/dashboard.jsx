import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button, Container, Row, Col } from "react-bootstrap";
import Header from "../app/components/Header";
import styles from "../app/globals.module.css";
import { Navbar, Nav } from "react-bootstrap";
import "../public/bootstrap.min.css";
import BottomNavBar from "../app/components/Navbar";
import CalorieCount from "../app/components/CalorieCount";
import DailyActivity from "../app/components/DailyActivity";
import FitnessLevel from "../app/components/FitnessLevel";
import PersonalRecords from "../app/components/PersonalRecords";
import StreaksandBadges from "../app/components/StreaksandBadges";
import WorkoutLog from "../app/components/WorkoutLog";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

export default function Dashboard() {
  // This function generates the data for the chart.
  // It assumes workouts is an array of workout objects, each with a date property.
  const getChartData = () => {
    // Load workouts from localStorage
    const workouts =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("workouts"))
        : [];

    // Create an object to hold counts by month
    const countsByMonth = {};

    // For each workout...
    for (let workout of workouts) {
      // Extract the month from the date
      const month = workout.date.slice(0, 7); // This assumes date is in "yyyy-mm-dd" format

      // If we've already seen this month, increment the count
      // Otherwise, set the count for this month to 1
      countsByMonth[month] = (countsByMonth[month] || 0) + 1;
    }

    // Generate the chart data
    const chartData = {
      labels: Object.keys(countsByMonth), // The months
      datasets: [
        {
          data: Object.values(countsByMonth), // The counts
          fill: false,
          backgroundColor: "rgb(75, 192, 192)",
          borderColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    };

    return chartData;
  };

  if (typeof window !== "undefined") {
    ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement);  // Add LineElement here
  }

  const data = getChartData();

  return (
    <main style={{ minHeight: "100vh" }}>
      <Header />
      <Container>
        <h2 className={styles.header2}>Dashboard</h2>
        <Row>
          <Col md={6}>
            <h2 className={styles.dashboardSubtitle}>Workouts Completed</h2>
            <div>
              <Line data={data} />
            </div>
          </Col><Col md={6}>
            <WorkoutLog />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <PersonalRecords />
          </Col>
          <Col md={6}>
            <DailyActivity />
          </Col>
        </Row>
        <Row><Col md={6}>
            <CalorieCount />
          </Col>
         
          <Col md={6}>
            <FitnessLevel />
          </Col> 
        </Row>
        <Row>
          
          <Col md={6}>
            <StreaksandBadges />
          </Col>
        </Row>
      </Container>
      <BottomNavBar />
    </main>
  );
}
