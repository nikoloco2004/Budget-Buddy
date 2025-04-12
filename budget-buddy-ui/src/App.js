import React, { useState } from 'react';
import BudgetDashboard from './components/BudgetDashboard';

function App() {
  const [layoutData, setLayoutData] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [income, setIncome] = useState('');


  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>💰 Budget Buddy</h1>
      
      <div style={{ padding: "1rem", maxWidth: "500px", margin: "auto" }}>
        <h2>💼 Monthly Income</h2>
        <input
          type="number"
          placeholder="Enter total income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
        <h2>📝 Add Recurring Expense</h2>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={() => {
            if (!category || !amount) return;
            setExpenses([...expenses, { category, amount: parseFloat(amount) }]);
            setCategory('');
            setAmount('');
          }}
        >
          ➕ Add Expense
        </button>

        <button
          style={{ marginLeft: "1rem" }}
          onClick={async () => {
            const res = await fetch("http://localhost:3000/ai/organize-expenses", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ income, expenses }),
            });

            const data = await res.json();
            try {
              const cleaned = data.response.replace(/```json|```/g, "").trim();
              const parsed = JSON.parse(cleaned);
              setLayoutData(parsed);
            } catch (err) {
              console.error("Failed to parse Gemini layout:", err.message);
            }
          }}
        >
          🧠 Generate Budget with AI
        </button>

        <ul>
          {expenses.map((e, i) => (
            <li key={i}>{e.category}: ${e.amount}</li>
          ))}
        </ul>
      </div>

      {layoutData && <BudgetDashboard layoutData={layoutData} />}
    </div>
  );
}

export default App;


