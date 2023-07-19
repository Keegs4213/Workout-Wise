//pages/tracker.jsx
import { Container } from 'react-bootstrap';
import Header from '../app/components/Header';
import BottomNavBar from '../app/components/Navbar';
import dynamic from 'next/dynamic';
import "../public/bootstrap.min.css"
import styles from "../app/globals.module.css"


const WorkoutTracker = dynamic(
    () => import('../app/components/WorkoutTracker'), 
    { ssr: false }
);

export default function TrackerPage() {
    return (
        <main style={{ height: '100vh' }}>
            <Header />
            <Container>
                <h2 className={styles.header2}>Workout Tracker</h2>
                <WorkoutTracker />
            </Container>
            <BottomNavBar/>
        </main>
    );
}
