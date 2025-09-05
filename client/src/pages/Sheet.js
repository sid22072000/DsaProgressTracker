import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChapters } from "../state/sheet/thunks";
import { fetchProgress, updateProgress } from "../state/progress/thunks";
import Loader from "../components/Loader";
import "./Sheet.css";

function Sheet() {
  const dispatch = useDispatch();
  const { chapters, loading, error } = useSelector((state) => state.sheet);
  const { progress } = useSelector((state) => state.progress);
  const [expandedChapters, setExpandedChapters] = useState({});

  useEffect(() => {
    if (chapters.length > 0) {
      const allExpanded = {};
      chapters.forEach((ch) => {
        allExpanded[ch._id] = true;
      });
      setExpandedChapters(allExpanded);
    }
  }, [chapters]);

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  useEffect(() => {
    dispatch(fetchChapters());
    dispatch(fetchProgress());
  }, [dispatch]);

  const handleCheckbox = (problemId, checked) => {
    dispatch(updateProgress({ problemId, completed: checked }));
  };

  if (loading) return <Loader />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="sheet-container">
      <h2
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          fontWeight: 700,
          fontSize: "2rem",
          letterSpacing: "1px",
        }}
      >
        DSA Progress Tracker
      </h2>
      {chapters.map((chapter) => (
        <div
          key={chapter._id}
          className="chapter"
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            marginBottom: "2rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            background: "#fff",
          }}
        >
          <div
            className="chapter-header"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              padding: "1rem 1.5rem",
              background: "#f7f7f7",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
            onClick={() => toggleChapter(chapter._id)}
          >
            <h3
              style={{
                margin: 0,
                fontWeight: 600,
                fontSize: "1.3rem",
                color: "#2d3a4b",
              }}
            >
              {chapter.title}
            </h3>
            <button
              style={{
                marginLeft: "1rem",
                padding: "0.3rem 1rem",
                borderRadius: "5px",
                border: "none",
                background: "#3498db",
                color: "#fff",
                fontWeight: 500,
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              {expandedChapters[chapter._id] ? "Collapse" : "Expand"}
            </button>
          </div>
          <p style={{ padding: "0 1.5rem", color: "#555", fontSize: "1rem" }}>
            {chapter.description}
          </p>
          {expandedChapters[chapter._id] && (
            <div style={{ padding: "0 1.5rem 1.5rem 1.5rem" }}>
              {chapter.topics.map((topic) => (
                <div
                  key={topic._id}
                  className="topic"
                  style={{ marginBottom: "1.5rem" }}
                >
                  <h4
                    style={{
                      fontWeight: 500,
                      color: "#3a4d63",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {topic.title}
                  </h4>
                  <p style={{ color: "#888", marginBottom: "0.5rem" }}>
                    {topic.description}
                  </p>
                  <ul
                    className="problem-list"
                    style={{ listStyle: "none", padding: 0 }}
                  >
                    {topic.problems.map((problem) => (
                      <li
                        key={problem._id}
                        className="problem-item"
                        style={{
                          marginBottom: "0.7rem",
                          padding: "0.7rem",
                          borderRadius: "6px",
                          background: "#f9f9f9",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                        }}
                      >
                        <label
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.7rem",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={!!progress[problem._id]}
                            onChange={(e) =>
                              handleCheckbox(problem._id, e.target.checked)
                            }
                            style={{
                              accentColor: "#3498db",
                              width: "18px",
                              height: "18px",
                            }}
                          />
                          <span
                            className={`level ${problem.level.toLowerCase()}`}
                            style={{
                              fontWeight: 600,
                              color: "#fff",
                              background:
                                problem.level === "Easy"
                                  ? "#27ae60"
                                  : problem.level === "Medium"
                                  ? "#f1c40f"
                                  : "#e74c3c",
                              borderRadius: "4px",
                              padding: "2px 8px",
                              fontSize: "0.9rem",
                            }}
                          >
                            {problem.level}
                          </span>
                          <strong
                            style={{ fontSize: "1.05rem", color: "#2d3a4b" }}
                          >
                            {problem.title}
                          </strong>
                        </label>
                        <div
                          className="links"
                          style={{ marginTop: "0.3rem", fontSize: "0.95rem" }}
                        >
                          <a
                            href={problem.youtubeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#e74c3c",
                              fontWeight: 500,
                              textDecoration: "underline",
                            }}
                          >
                            YouTube
                          </a>{" "}
                          |{" "}
                          <a
                            href={problem.leetCodeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#3498db",
                              fontWeight: 500,
                              textDecoration: "underline",
                            }}
                          >
                            LeetCode
                          </a>{" "}
                          |{" "}
                          {problem.codeforcesLink && (
                            <a
                              href={problem.codeforcesLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#8e44ad",
                                fontWeight: 500,
                                textDecoration: "underline",
                              }}
                            >
                              Codeforces
                            </a>
                          )}{" "}
                          |{" "}
                          <a
                            href={problem.articleLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#16a085",
                              fontWeight: 500,
                              textDecoration: "underline",
                            }}
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
          )}
        </div>
      ))}
    </div>
  );
}

export default Sheet;
