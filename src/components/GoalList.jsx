import React from "react";

function GoalList({ goals, onEdit, onDelete }) {
  function getDaysLeft(targetDate) {
    const today = new Date();
    const dueDate = new Date(targetDate);
    const timeDiff = dueDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft;
  }

  return (
    <div className="goal-list">
      {goals.map((goal) => {
        const daysLeft = getDaysLeft(goal.targetDate);
        const isOverdue = daysLeft < 0;

        return (
          <div
            key={goal.id}
            className="goal-card"
            style={{
              border: isOverdue ? "2px solid red" : "1px solid #ccc",
              backgroundColor: "#fff",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>{goal.title}</h3>
            <p>{goal.description}</p>
            <p>
              <strong>Target Date:</strong> {goal.targetDate}
            </p>
            <p
              style={{
                color: isOverdue ? "red" : "green",
                fontWeight: "bold",
              }}
            >
              {isOverdue
                ? "Overdue!"
                : `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`}
            </p>
            <button
              style={{
                marginRight: "10px",
                padding: "5px 10px",
                borderRadius: "5px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
              }}
              onClick={() => onEdit(goal)}
            >
              Edit
            </button>
            <button
              style={{
                padding: "5px 10px",
                borderRadius: "5px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
              }}
              onClick={() => onDelete(goal.id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default GoalList;
