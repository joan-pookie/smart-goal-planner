import React, { useEffect, useState } from "react";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import "./App.css";

function App() {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const API_URL = "https://smart-goal-planner-1-8tc9.onrender.com/goals";

  // Fetch existing goals
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched goals:", data);
        setGoals(data);
      })
      .catch((error) => console.error("Error fetching goals:", error));
  }, []);

  // Add or Edit Goal
  function handleFormSubmit(goalData) {
    if (goalData.id) {
      // Update existing goal
      fetch(`${API_URL}/${goalData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goalData),
      })
        .then((res) => res.json())
        .then((updatedGoal) => {
          setGoals((prev) =>
            prev.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal))
          );
        });
    } else {
      // Create new goal
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goalData),
      })
        .then((res) => res.json())
        .then((newGoal) => {
          setGoals((prev) => [...prev, newGoal]);
        });
    }

    setShowForm(false);
    setEditingGoal(null);
  }

  // Delete goal
  function handleDelete(goalId) {
    fetch(`${API_URL}/${goalId}`, {
      method: "DELETE",
    })
      .then(() => {
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
      })
      .catch((error) => console.error("Error deleting goal:", error));
  }

  // Edit goal
  function handleEdit(goal) {
    setEditingGoal(goal);
    setShowForm(true);
  }

  return (
    <div className="app-container">
      <h1>Smart Goal Planner</h1>

      {showForm ? (
        <GoalForm
          goal={editingGoal || {}}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setEditingGoal(null);
            setShowForm(false);
          }}
        />
      ) : (
        <button
          onClick={() => {
            setEditingGoal(null);
            setShowForm(true);
          }}
        >
          Add Goal
        </button>
      )}

      <GoalList goals={goals} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;

