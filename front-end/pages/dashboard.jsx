//dashboard.jsx
import React from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Button, Container, Row, Col } from 'react-bootstrap'
import Header from '../app/components/Header'
import styles from '../app/globals.module.css'
import { Navbar, Nav } from 'react-bootstrap'
import '../public/bootstrap.min.css'
import BottomNavBar from '../app/components/Navbar'
import CalorieCount from '../app/components/CalorieCount'
import WorkoutLog from '../app/components/WorkoutLog'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import LoadingSpinner from '../app/components/LoadingSpinner'
import '../app/globals.css'

export default function Dashboard() {
  const [quote, setQuote] = useState('')
  const [userName, setUserName] = useState('')
  const [fitnessGoal, setFitnessGoal] = useState('')
  const [user, setUser] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [goals, setGoals] = useState('')
  const [chartData, setChartData] = useState({ labels: [], datasets: [] })
  const [doughnutData, setDoughnutData] = useState({ labels: [], datasets: [] })

  useEffect(() => {
    const fitnessGoal = localStorage.getItem('fitnessGoal')
    const fitnessLevel = localStorage.getItem('fitnessLevel')
    setFitnessGoal(fitnessGoal)
    console.log(fitnessGoal)
    console.log(fitnessLevel)
    const userNameFromStorage = localStorage.getItem('userName')
    setUserName(userNameFromStorage)

    const fetchUser = async () => {
      const userId = localStorage.getItem('userId')
      const userNameFromStorage = localStorage.getItem('userName')
      setUserName(userNameFromStorage)

      try {
        const response = await axios.get(
          `http://localhost:3245/users/${userId}`
        )
        setUser(response.data)
        setGoals(response.data.fitnessGoal)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    const fetchQuote = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3245/quote/randomQuote'
        )
        setQuote(response.data.quote)
      } catch (error) {
        console.error('Error fetching quote:', error)
      }
    }
    const newChartData = getChartData()
    setChartData(newChartData)

    const newDoughnutData = getDoughnutData(newChartData)
    setDoughnutData(newDoughnutData)

    fetchUser()
    fetchQuote()
  }, [])

  const getChartData = () => {
    let workouts = []
    workouts =
      typeof window !== 'undefined' &&
      JSON.parse(localStorage.getItem('workouts'))

    console.log('Workouts:', workouts) // <-- Add this line

    const countsByMonth = {}

    for (let i = 0; i < workouts.length; i += 5) {
      const workout = workouts[i];
      const month = workout.date.slice(0, 7);

      countsByMonth[month] = (countsByMonth[month] || 0) + 1;

    }

    console.log('Counts by Month:', countsByMonth) 

    const chartData = {
      labels: Object.keys(countsByMonth),
      datasets: [
        {
          data: Object.values(countsByMonth),
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    }

    console.log('Chart Data:', chartData) 

    return chartData
  }

  const currentDate = new Date()
  const currentMonth = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, '0')}`

  const data = getChartData()

  const workoutsCompleted = data.labels.includes(currentMonth)
    ? data.datasets[0].data[data.labels.indexOf(currentMonth)]

    : 0;
  const totalWorkouts = 15;


  const getDoughnutData = (chartData) => {
    const workoutsRemaining = totalWorkouts - workoutsCompleted

    const doughnutData = {
      labels: ['Completed', 'Remaining'],
      datasets: [
        {
          data: [workoutsCompleted, workoutsRemaining],
          backgroundColor: ['#03f4fc', '#8403fc'],
        },
      ],
    }

    console.log('Doughnut Data:', doughnutData) 

    return doughnutData
  }

  if (typeof window !== 'undefined') {
    ChartJS.register(
      ArcElement,
      CategoryScale,
      Tooltip,
      Legend,
      LinearScale,
      PointElement,
      LineElement
    )
  }
  // Import the Doughnut component dynamically
  const Doughnut = dynamic(
    () => import('react-chartjs-2').then((mod) => mod.Doughnut),
    { ssr: false } // disables server-side rendering for this component
  )

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Workouts Completed This Month',
      fontSize: 20,
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    tooltips: {
      enabled: true,
      callbacks: {
        label: function (tooltipItem, data) {
          const dataset = data.datasets[tooltipItem.datasetIndex]
          const currentValue = dataset.data[tooltipItem.index]
          return currentValue + ' workouts'
        },
      },
    },
  }

  return (
    <main style={{ minHeight: '100vh' }}>
      <Header />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Container>
            <h2 className={styles.header2}>Welcome {userName}</h2>

            <Row>
              <Col md={6}>
                <div style={{ width: '75%', height: '75%' }}>
                  <h2 className={styles.dashboardSubtitle}>
                    Workouts Completed
                  </h2>
                  <p className={styles.dashboardText}>
                    You have completed {workoutsCompleted} /{totalWorkouts}{' '}
                    workouts this month
                  </p>
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <h3 className={styles.dashboardText}>
                  Your current goal is {fitnessGoal}
                </h3>
                <br></br>
                <WorkoutLog /> <CalorieCount />
                <h3 className={styles.quoteText}>Motivational Quote</h3>
                <h5 className={styles.quoteText}>&quot;{quote}&quot;</h5>
              </Col>
            </Row>
            <Row>
              <Col md={6}></Col>
              <Col md={6}></Col>
            </Row>
            <Row>
              <Col md={6}></Col>
              <Col md={6}></Col>
            </Row>
          </Container>
          <BottomNavBar />
        </>
      )}
    </main>
  )
}
