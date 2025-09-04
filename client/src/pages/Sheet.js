import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChapters } from "../state/sheet/thunks";
import { fetchProgress, updateProgress } from "../state/progress/thunks";
import "./Sheet.css";

function Sheet() {
  const dispatch = useDispatch();
  const { chapters, loading, error } = useSelector((state) => state.sheet);
  const { progress } = useSelector((state) => state.progress);

  useEffect(() => {
    dispatch(fetchChapters());
    dispatch(fetchProgress());
  }, [dispatch]);

  const handleCheckbox = (problemId, checked) => {
    dispatch(updateProgress({ problemId, completed: checked }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="sheet-container">
      <h2>DSA Sheet</h2>
      {chapters.map((chapter) => (
        <div key={chapter._id} className="chapter">
          <h3>{chapter.title}</h3>
          <p>{chapter.description}</p>
          {chapter.topics.map((topic) => (
            <div key={topic._id} className="topic">
              <h4>{topic.title}</h4>
              <p>{topic.description}</p>
              <ul className="problem-list">
                {topic.problems.map((problem) => (
                  <li key={problem._id} className="problem-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={!!progress[problem._id]}
                        onChange={(e) =>
                          handleCheckbox(problem._id, e.target.checked)
                        }
                      />
                      <span className={`level ${problem.level.toLowerCase()}`}>
                        {problem.level}
                      </span>
                      <strong>{problem.title}</strong>
                    </label>
                    <div className="links">
                      <a
                        href={problem.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        YouTube
                      </a>{" "}
                      |{" "}
                      <a
                        href={problem.leetCodeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LeetCode
                      </a>{" "}
                      |{" "}
                      {problem.codeforcesLink && (
                        <a
                          href={problem.codeforcesLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Codeforces
                        </a>
                      )}{" "}
                      |{" "}
                      <a
                        href={problem.articleLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Article
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Sheet;
