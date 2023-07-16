import { Spinner } from 'react-bootstrap';
import styles from "../globals.module.css"

function LoadingSpinner() {
    return (
      <div className={styles.loadingSpinnerContainer}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

export default LoadingSpinner;
