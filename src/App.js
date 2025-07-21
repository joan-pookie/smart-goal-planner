import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    goal: "",
    amount: "",
    deadline: ""
  });

  useEffect(() => {
    fetch("http://localhost:3001/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((error) => console.error("Error fetching goals:", error));
  }, []);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newGoal = {
      goal: formData.title,
      amount: Number(formData.amount),
      deadline: formData.deadline
    };

    fetch("http://localhost:3001/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newGoal)
    })
      .then((res) => res.json())
      .then((data) => {
        setGoals([...goals, data]);
        setFormData({ title: "", amount: "", deadline: "" });
      })
      .catch((error) => console.error("Submit error:", error));
  }

  function handleDelete(id) {
    fetch(`http://localhost:3001/goals/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        const updatedGoals = goals.filter((goal) => goal.id !== id);
        setGoals(updatedGoals);
      })
      .catch((error) => console.error("Delete error:", error));
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Smart Goal Planner</h1>
      <p>Track and manage your savings goals.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter your goal"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Goal</button>
      </form>

      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <strong>{goal.title}</strong> - KES {goal.amount} (Deadline:{" "}
            {goal.deadline}){" "}
            <button onClick={() => handleDelete(goal.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;