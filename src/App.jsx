import React, { useEffect, useState } from "react";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import "./App.css";

function App() {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
const API_URL = "https://smart-goal-planner-1-8tc9.onrender.com/goals";
  // Fetch existing goals from the server
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched goals:", data);
        setGoals(data);
      })
      .catch((error) => console.error("Error fetching goals:", error));
  }, []);

  // Submit (Add or Edit) goal
  function handleFormSubmit(goalData) {
    if (goalData.id) {
      // Update existing goal
      fetch(`http://localhost:3000/goals/${goalData.id}`, {
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
      fetch("http://localhost:3000/goals", {
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
    fetch(`http://localhost:3000/goals/${goalId}`, {
      method: "DELETE",
    })
      .then(() => {
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
      })
      .catch((error) => console.error("Error deleting goal:", error));
  }

  // Start editing
  function handleEdit(goal) {
    setEditingGoal(goal);
    setShowForm(true);
  }

  return (
    <div className="app-container">
      <h1>Smart Goal Planner</h1>

      {showForm ? (
        <GoalForm
          goal={editingGoal || {}} // Ensure goal is never null
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setEditingGoal(null);
            setShowForm(false);
          }}
        />
      ) : (
        <button onClick={() => {
          setEditingGoal(null); // Reset editingGoal to avoid prefilled data
          setShowForm(true);
        }}>
          Add Goal
        </button>
      )}

      <GoalList goals={goals} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
