function GoalItem({ goal, onEditClick }) {
  return (
    <div className="goal-card">
      <h3>{goal.title}</h3>
      <p>{goal.description}</p>
      <p>Target: ${goal.targetAmount}</p>
      <p>Deadline: {goal.deadline}</p>
      <button onClick={() => onEditClick(goal)}>Edit</button>
    </div>
  );
}

export default GoalItem;
