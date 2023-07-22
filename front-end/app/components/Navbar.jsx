import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCheck, faList, faBook, faHome } from '@fortawesome/free-solid-svg-icons';

function BottomNavBar() {
  return (
    <Nav className="justify-content-around fixed-bottom" activeKey="/home" style={{ backgroundColor: "#3503fc", boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)' }}>
      <Nav.Item>
        <Nav.Link href="/dashboard">
          <FontAwesomeIcon icon={faHome} />
          <div>Dashboard</div>
        </Nav.Link>
        </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/tracker">
          <FontAwesomeIcon icon={faCheck} />
          <div>Tracker</div>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/generatePlan">
          <FontAwesomeIcon icon={faList} />
          <div>Plan</div>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/library">
          <FontAwesomeIcon icon={faBook} />
          <div>Library</div>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/profile">
          <FontAwesomeIcon icon={faUser} />
          <div>Profile</div>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default BottomNavBar;
