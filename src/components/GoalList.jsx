import React from "react";
function GoalList({ goals, onEdit, onDelete }) {
  return (
    <div>
      {goals.map((goal) => (
        <div key={goal.id} className="goal-card">
          <h3>{goal.title}</h3>
          <p>{goal.description}</p>
          <p>Target Date: {goal.targetDate}</p>
          <button onClick={() => onEdit(goal)}>Edit</button>
          <button className="delete" onClick={() => onDelete(goal.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}


export default GoalList;
