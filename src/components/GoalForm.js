
import React, { useState } from 'react';

function GoalForm({ onAddGoal }) {
  
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    
    if (!name || !target || !deadline) {
      alert('Please fill in Name, Target Amount, and Deadline.');
      return;
    }

    const newGoal = {
      id: Date.now().toString(),   
      name,
      targetAmount: Number(target),
      savedAmount: 0,
      category,
      deadline,
      createdAt: new Date().toISOString().slice(0, 10)
    };

    onAddGoal(newGoal);   

    setName('');
    setTarget('');
    setCategory('');
    setDeadline('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Goal</h2>

      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Target Amount:
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
      </label>

      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>

      <label>
        Deadline:
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </label>

      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
