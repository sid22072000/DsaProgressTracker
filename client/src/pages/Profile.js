import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../state/auth/selectors";
import { selectChapters } from "../state/sheet/selectors";
import { selectProgressData } from "../state/progress/selectors";
import {
  FaCheckCircle,
  FaRegCircle,
  FaStar,
  FaRegStar,
  FaChartPie,
} from "react-icons/fa";
import "./Profile.css";
import { useEffect } from "react";
import { fetchChapters } from "../state/sheet/thunks";
import { fetchProgress } from "../state/progress/thunks";

function Profile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChapters());
    dispatch(fetchProgress());
  }, [dispatch]);
  const user = useSelector(selectUser);
  const chapters = useSelector(selectChapters);
  const progress = useSelector(selectProgressData);

  // Calculate total questions, chapters, and progress by level
  let totalQuestions = 0;
  let totalChapters = chapters.length;
  let levelCount = { Easy: 0, Medium: 0, Tough: 0 };
  let completedCount = 0;
  let completedLevel = { Easy: 0, Medium: 0, Tough: 0 };
  let inProgressLevel = { Easy: 0, Medium: 0, Tough: 0 };

  chapters.forEach((chapter) => {
    chapter.topics.forEach((topic) => {
      topic.problems.forEach((problem) => {
        totalQuestions++;
        levelCount[problem.level]++;
        if (progress[problem._id]) {
          completedCount++;
          completedLevel[problem.level]++;
        } else {
          inProgressLevel[problem.level]++;
        }
      });
    });
  });

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {user && (
        <div className="profile-details">
          <p>
            <strong>Name:</strong> {user.user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.user.email}
          </p>
        </div>
      )}
      <div className="profile-progress">
        <h3>Progress</h3>
        <div className="progress-circles">
          <div className="progress-circle">
            <div className="progress-icon">
              <FaChartPie />
            </div>
            <div className="progress-label">Chapters</div>
            <div className="progress-number">{totalChapters}</div>
          </div>
          <div className="progress-circle">
            <div className="progress-icon">
              <FaStar />
            </div>
            <div className="progress-label">Questions</div>
            <div className="progress-number">{totalQuestions}</div>
          </div>
          <div className="progress-circle">
            <div className="progress-icon">
              <FaCheckCircle color="#43a047" />
            </div>
            <div className="progress-label">Completed</div>
            <div className="progress-number">
              {completedCount} / {totalQuestions}
            </div>
          </div>
        </div>
        <div className="level-breakdown">
          <div className="progress-circle">
            <div className="progress-icon">
              <FaRegCircle color="#4caf50" />
            </div>
            <div className="progress-label">Easy</div>
            <div className="progress-number">
              {completedLevel.Easy} / {levelCount.Easy}
            </div>
          </div>
          <div className="progress-circle">
            <div className="progress-icon">
              <FaRegStar color="#ff9800" />
            </div>
            <div className="progress-label">Medium</div>
            <div className="progress-number">
              {completedLevel.Medium} / {levelCount.Medium}
            </div>
          </div>
          <div className="progress-circle">
            <div className="progress-icon">
              <FaStar color="#d32f2f" />
            </div>
            <div className="progress-label">Tough</div>
            <div className="progress-number">
              {completedLevel.Tough} / {levelCount.Tough}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
