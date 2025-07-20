import React, { useState } from 'react';
import GoalForm from './components/GoalForm';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]); 


  function addGoal(newGoal) {
    setGoals([...goals, newGoal]);          
    console.log('New goal added:', newGoal);
  }

  return (
    <div className="App">
      <header>
        <h1>Smart Goal Planner</h1>
      </header>

      <main>
        <GoalForm onAddGoal={addGoal} />

        <h2>Your Goals</h2>
        <ul>
          {goals.map((goal) => (
            <li key={goal.id}>
              {goal.name} – {goal.savedAmount}/{goal.targetAmount}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
