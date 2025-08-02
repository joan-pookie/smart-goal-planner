import React, { useState } from "react";

function GoalForm({ goal = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: goal.title || "",
    description: goal.description || "",
    targetDate: goal.targetDate || "",
    amount: goal.amount || "",
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

    const formattedGoal = {
      ...formData,
      amount: formData.amount ? parseFloat(formData.amount) : undefined,
    };

    if (goal.id) {
      const updatedGoal = { ...goal, ...formattedGoal };
      onSubmit(updatedGoal);
    } else {
      onSubmit(formattedGoal);
    }

    setFormData({
      title: "",
      description: "",
      targetDate: "",
      amount: "",
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
