import { Container } from 'react-bootstrap';
import Header from '../app/components/Header';
import BottomNavBar from '../app/components/Navbar';
import dynamic from 'next/dynamic';
import "../public/bootstrap.min.css"


const WorkoutTracker = dynamic(
    () => import('../app/components/WorkoutTracker'), 
    { ssr: false }
  );

export default function TrackerPage() {
    return (
        <main style={{ height: '100vh' }}>
            <Header />
            <Container>
                <h1>Workout Tracker</h1>
                <WorkoutTracker />
            </Container>
            <BottomNavBar/>
        </main>
    );
}
