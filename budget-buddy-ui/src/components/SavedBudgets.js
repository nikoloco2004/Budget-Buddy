import React, { useEffect, useState } from 'react';

const SavedBudgets = ({ onLoadBudget }) => {
  const [savedBudgets, setSavedBudgets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/saved-budgets")
      .then(res => res.json())
      .then(data => setSavedBudgets(data))
      .catch(err => console.error("❌ Failed to load saved budgets:", err));
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto" }}>
      <h2>📂 Saved Budgets</h2>
      {savedBudgets.length === 0 ? (
        <p>No saved budgets found.</p>
      ) : (
        savedBudgets.map((budget, index) => (
          <div key={index} style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "1rem",
            marginBottom: "1rem",
            backgroundColor: "transparent",
            color: "#000000"
          }}>
            <h3>📌 {budget.name || "Unnamed Budget"}</h3>
            <strong>🕒 {new Date(budget.timestamp).toLocaleString()}</strong>
            <p>💰 Income: ${budget.income}</p>
            <p>💸 Expenses:</p>
            <ul>
              {budget.expenses.map((e, i) => (
                <li key={i}>{e.category}: ${e.amount}</li>
              ))}
            </ul>
            <p>📊 Final montlhy Budgets:</p>
            <ul>
              {budget.finalBudget.map((c, i) => (
                <li key={i}>{c.name}: ${c.suggestedAmount}</li>
              ))}
            </ul>
            <button
            style={{
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                marginTop: "1rem",
                marginRight: "1rem",
                borderRadius: "6px",
                cursor: "pointer"
            }}
            onClick={() => onLoadBudget(budget)}
            >
            🔁 Load This Budget
            </button>
            <button
            style={{
                backgroundColor: "#ff4d4f",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                marginTop: "1rem",
                borderRadius: "6px",
                cursor: "pointer"
            }}
            onClick={async () => {
                const confirmDelete = window.confirm("Are you sure you want to delete this budget?");
                if (!confirmDelete) return;

                const res = await fetch(`http://localhost:3000/delete-budget/${budget._id}`, {
                    method: "DELETE"
                });
                const data = await res.json();
                if (data.success) {
                setSavedBudgets(savedBudgets.filter((b) => b._id !== budget._id));
                } else {
                alert("❌ Failed to delete budget.");
                }
            }}
            >
            🗑️ Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedBudgets;
