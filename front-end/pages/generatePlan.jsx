import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../app/components/Header";
import "../public/bootstrap.min.css";
import styles from "../app/globals.module.css";
import { Table, Button, Modal } from "react-bootstrap";
import YouTube from "react-youtube";
import { useRouter } from "next/router";
import LoadingSpinner from "../app/components/LoadingSpinner";
import "../app/globals.css"

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomSets() {
  const sets = [3, 4];
  return sets[Math.floor(Math.random() * sets.length)];
}

function randomReps() {
  const reps = [10, 12, 15];
  return reps[Math.floor(Math.random() * reps.length)];
}

// Helper function to capitalize the first letter of each word and replace underscores
function formatString(string) {
  return string
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function GeneratePlanPage() {
  const [exercisePlan, setExercisePlan] = useState([]);
  const [userName, setUserName] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  const router = useRouter();

  const handleDashboardNavigation = () => {
    router.push("/dashboard");
  };
  const handleRegeneratePlan = () => {
    router.push("/setGoals");
  };

  const openModal = (exercise) => {
    setShowModal(true);
    setCurrentExercise(exercise);
    // Search for a demonstration video
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${exercise.name}%20exercise%20howto%20demonstration&key=AIzaSyAn_AA9nU7HiOJ3K_2f2MYVDyOSThFGTkU`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          if (data.items.length > 0) {
            setCurrentVideo(data.items[0].id.videoId);
          }
        } else {
          console.error("No items found in data:", data);
        }
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentExercise(null);
    setCurrentVideo(null);
  };

  const opts = {
    height: "300px",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    const fitnessGoal = localStorage.getItem("fitnessGoal");
    const fitnessLevel = localStorage.getItem("fitnessLevel");
    setFitnessGoal(fitnessGoal);
    console.log(fitnessGoal);
    console.log(fitnessLevel);
    const userNameFromStorage = localStorage.getItem("userName");
    setUserName(userNameFromStorage);

    // If the user hasn't set fitnessGoal and fitnessLevel yet, don't make an API request.
    if (!fitnessGoal || !fitnessLevel) {
      return;
    }

    // Define the number of exercises and days based on the user's fitness level
    const fitnessLevelMapping = {
      Beginner: { exercises: 10, days: 2 },
      Intermediate: { exercises: 15, days: 3 },
      Expert: { exercises: 20, days: 4 },
    };

    // Determine the exercise types based on fitness goal
    let exerciseTypes = [];
    switch (fitnessGoal.toLowerCase()) {
      case "muscle gain":
        exerciseTypes = ["strength"];
        break;
      case "fat loss":
        exerciseTypes = ["cardio"];
        break;
      case "tone up":
        exerciseTypes = ["strength", "cardio"];
        break;
      case "mobility":
        exerciseTypes = ["stretching"];
        break;
      default:
        exerciseTypes = ["strength"]; // default value
    }

    const fetchExercises = async (
      type,
      offset = 0,
      exercises = [],
      difficulties = [fitnessLevel],
      maxExercises = fitnessLevelMapping[fitnessLevel].exercises
    ) => {
      try {
        const difficulty = difficulties.shift(); // get and remove the first difficulty from the array
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/exercises?type=${type}&difficulty=${difficulty}&offset=${offset}`,
          {
            headers: {
              "X-Api-Key": "VPInujgC7uxthV//ZJVY4g==01tRgS7nO7Xsk04W",
            },
          }
        );

        let newExercises = [...exercises, ...response.data];

        // If we have enough exercises, process them and add them to the plan
        if (newExercises.length >= maxExercises) {
          if (type === "cardio" && fitnessGoal.toLowerCase() === "tone up") {
            newExercises = newExercises.slice(
              0,
              fitnessLevelMapping[fitnessLevel].days
            );
          }
          // If the exercise type is cardio and the fitness goal is not fat loss, we only take the first exercise
          if (type === "cardio" && fitnessGoal.toLowerCase() !== "fat loss") {
            newExercises = [newExercises[0]];
          }
          return newExercises
            .slice(0, fitnessLevelMapping[fitnessLevel].exercises)
            .map((exercise) => {
              if (type === "strength") {
                return {
                  ...exercise,
                  recommendedSets: randomSets(),
                  recommendedReps: randomReps(),
                  equipment: exercise.equipment,
                };
              } else if (type === "cardio") {
                let recommendedDuration;
                switch (fitnessLevel) {
                  case "Beginner":
                    recommendedDuration = Math.floor(Math.random() * 6) + 15; // 15-20 mins
                    break;
                  case "Intermediate":
                    recommendedDuration = 30; // 30 mins
                    break;
                  case "Expert":
                    recommendedDuration = Math.floor(Math.random() * 16) + 45; // 45-60 mins
                    break;
                  default:
                    recommendedDuration = 30;
                }
              } else if (type === "stretching") {
                let recommendedDuration;
                switch (fitnessLevel) {
                  case "Beginner":
                    recommendedDuration = Math.floor(Math.random() * 6) + 5; // 5-10 mins
                    break;
                  case "Intermediate":
                    recommendedDuration = Math.floor(Math.random() * 6) + 10; // 10-15 mins
                    break;
                  case "Expert":
                    recommendedDuration = Math.floor(Math.random() * 6) + 15; // 15-20 mins
                    break;
                  default:
                    recommendedDuration = 10;
                }

                return {
                  ...exercise,
                  recommendedDuration,
                  recommendedHeartRate: "120-140bpm",
                  equipment: exercise.equipment,
                };
              }
            });
        }

        // If we still don't have enough exercises and there are still difficulties to try, fetch more with the next difficulty
        if (difficulties.length > 0) {
          return fetchExercises(type, 0, newExercises, difficulties);
        }

        // If there are no more difficulties to try, fetch more with the same difficulty and a higher offset
        return fetchExercises(type, offset + 10, newExercises, [difficulty]);
      } catch (error) {
        console.error("Error fetching exercise plan:", error);
      }
    };

    const fetchAllExercises = async () => {
      let allExercises = [];
      for (const type of exerciseTypes) {
        const difficulties =
          fitnessLevel === "Expert"
            ? ["Expert", "Intermediate"]
            : [fitnessLevel];
        let exerciseCount = fitnessLevelMapping[fitnessLevel].exercises;
        if (fitnessGoal.toLowerCase() === "tone up") {
          if (type === "cardio") {
            // For tone up plan, ensure at least one cardio exercise is included each day
            exerciseCount = fitnessLevelMapping[fitnessLevel].days;
          } else if (type === "strength") {
            // Subtract the number of cardio exercises we already fetched
            exerciseCount -= fitnessLevelMapping[fitnessLevel].days;
          }
        }
        const exercises = await fetchExercises(
          type,
          0,
          [],
          difficulties,
          exerciseCount
        );
        allExercises = allExercises.concat(exercises);
      }

      // No need to slice the array for "tone up" goal
      if (fitnessGoal.toLowerCase() !== "tone up") {
        allExercises = allExercises.slice(
          0,
          fitnessLevelMapping[fitnessLevel].exercises
        );
      }
      // Now build the plan as before
      const splitPlan = [];
      for (let i = 0; i < fitnessLevelMapping[fitnessLevel].days; i++) {
        splitPlan.push(
          allExercises.slice(
            i * (allExercises.length / fitnessLevelMapping[fitnessLevel].days),
            (i + 1) *
              (allExercises.length / fitnessLevelMapping[fitnessLevel].days)
          )
        );
      }
      setExercisePlan(splitPlan);
      setIsLoading(false);
    };

    // Fetch the exercises
    fetchAllExercises();
  }, []);

  function getUniqueTypes(plan) {
    const typesSet = new Set();
    plan.forEach((day) =>
      day.forEach((exercise) => typesSet.add(exercise.type))
    );
    return Array.from(typesSet).join(", ");
  }

  return (
    <div>
      <Header />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h3>
            Hello {userName}, here is Your Customized Plan
          </h3>
          <div className={styles.tableContainer}>
            {exercisePlan && exercisePlan.length > 0 && (
              <h3 className={styles.planText}>
                Plan Type: {getUniqueTypes(exercisePlan).toUpperCase()}
              </h3>
            )}
            {exercisePlan &&
              exercisePlan.length > 0 &&
              exercisePlan.map((day, i) => (
                <div key={i}>
                  <br></br>
                  <h3 className={styles.header2}>
                    Day {i + 1}:{" "}
                    {fitnessGoal.toLowerCase() === "fat loss" &&
                      "(Pick one exercise)"}
                  </h3>

                  <Table
                    striped
                    bordered
                    hover
                    className={`table-primary ${styles.exerciseTable}`}
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Muscle</th>
                        <th>Difficulty</th>
                        <th>Recommendations</th>
                        <th>Equipment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {day.map((exercise, index) => (
                        <tr key={index}>
                          <td>
                            <Button
                              variant="link"
                              onClick={() => openModal(exercise)}
                            >
                              {exercise.name}
                            </Button>
                          </td>
                          <td>{formatString(exercise.muscle)}</td>
                          <td>{formatString(exercise.difficulty)}</td>
                          <td>
                            {exercise.type === "strength"
                              ? `${exercise.recommendedSets} sets of ${exercise.recommendedReps} reps`
                              : exercise.type === "cardio"
                              ? `${exercise.recommendedDuration} mins at heart rate ${exercise.recommendedHeartRate}`
                              : `${exercise.recommendedDuration} mins total, switch sides if required`}
                          </td>
                          <td>{formatString(exercise.equipment)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ))}
            <Modal show={showModal} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {currentExercise && currentExercise.name}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {currentVideo && <YouTube videoId={currentVideo} opts={opts} />}
                <p className={styles.exerciseInstructions}>
                  {currentExercise && currentExercise.instructions}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className={styles.buttonContainer}>
            <Button variant="secondary" onClick={handleRegeneratePlan}>
              Regenerate Plan
            </Button>
            <Button variant="secondary" onClick={handleDashboardNavigation}>
              Proceed to Dashboard
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default GeneratePlanPage;
