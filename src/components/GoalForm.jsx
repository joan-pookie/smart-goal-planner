import React, { useState } from "react";

function GoalForm({ goal = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: goal.title || "",
    description: goal.description || "",
    targetDate: goal.targetDate || "",
    amount: goal.amount || "", // new field
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (goal.id) {
      const updatedGoal = { ...goal, ...formData };
      onSubmit(updatedGoal);
    } else {
      fetch("http://localhost:3000/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((r) => r.json())
        .then((newGoal) => {
          onSubmit(newGoal);
        });
    }

    setFormData({
      title: "",
      description: "",
      targetDate: "",
      amount: "", // reset new field
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Goal Title"
        required
      />
      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        name="targetDate"
        type="date"
        value={formData.targetDate}
        onChange={handleChange}
      />
      <input
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount to Save"
        required
      />
      <button type="submit">{goal.id ? "Update Goal" : "Add Goal"}</button>
      {goal.id && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default GoalForm;
