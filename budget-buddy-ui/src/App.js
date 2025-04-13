import React, { useState } from 'react';
import BudgetDashboard from './components/BudgetDashboard';

function App() {
  const [layoutData, setLayoutData] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [income, setIncome] = useState('');
  const [customCategories, setCustomCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [secondLayout, setSecondLayout] = useState(null);
  const [showFeedbackBox, setShowFeedbackBox] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [refinedLayout, setRefinedLayout] = useState(null); // optional 3rd layer





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
      {layoutData && (
  <div style={{ padding: "1rem", maxWidth: "500px", margin: "auto" }}>
    <h2>💡 Add Budget Categories for Remaining Money (These are budgets you would like to have each month)</h2>
    <input
      type="text"
      placeholder="e.g. Clothing"
      value={newCategory}
      onChange={(e) => setNewCategory(e.target.value)}
    />
    <button onClick={() => {
      if (!newCategory) return;
      setCustomCategories([...customCategories, newCategory]);
      setNewCategory('');
    }}>
      ➕ Add Category
    </button>

    <ul>
      {customCategories.map((cat, i) => (
        <li key={i}>🧾 {cat}</li>
      ))}
    </ul>

    <button onClick={async () => {
      console.log("🧠 Sending categories to Gemini...");
      const res = await fetch("http://localhost:3000/ai/refine-budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          income,
          expenses,
          customCategories
        }),
      });

      const data = await res.json();
      try {
        try {
          const cleaned = data.response
            .replace(/```json|```/g, "")
            .replace(/\\n/g, "")
            .trim();
        
          if (!cleaned.startsWith("{")) {
            throw new Error("Not valid JSON: " + cleaned);
          }
        
          const parsed = JSON.parse(cleaned);
          setSecondLayout(parsed);
        } catch (err) {
          console.error("Failed to parse second Gemini layout:", err.message);
          alert("❌ Gemini did not return valid JSON. Try again or check server logs.");
        }                
      } catch (err) {
        console.error("Failed to parse second Gemini layout:", err.message);
      }
    }}>
      🔄 Ask Gemini to Suggest Budget with These Categories
    </button>
  </div>
)}
{secondLayout && secondLayout.categories && (
  <div style={{ padding: "1rem", maxWidth: "500px", margin: "auto" }}>
    <h2>🧠 Gemini's Suggested Budget</h2>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Category</th>
          <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Amount ($)</th>
        </tr>
      </thead>
      <tbody>
      {[...secondLayout.categories]
      .sort((a, b) => b.suggestedAmount - a.suggestedAmount)
      .map((cat, i) => (
          <tr key={i}>
            <td style={{ padding: "0.5rem 0" }}>{cat.name}</td>
            <td>${cat.suggestedAmount}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div style={{ marginTop: "1rem" }}>
  <button
    onClick={() => {
      alert("👍 Great! Budget accepted.");
    }}
    style={{ marginRight: "1rem" }}
  >
    ✅ Accept Budget
  </button>
  <button
    onClick={() => {
      setShowFeedbackBox(true); // we’ll create this state next
    }}
  >
    ❌ Decline & Suggest Changes
  </button>
  {showFeedbackBox && (
  <div style={{ marginTop: "1rem" }}>
    <h3>💬 Tell Gemini what you'd like to change:</h3>
    <textarea
      rows="4"
      style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", marginBottom: "0.5rem" }}
      placeholder="e.g. Allocate more to savings and reduce entertainment spending"
      value={feedbackText}
      onChange={(e) => setFeedbackText(e.target.value)}
    ></textarea>

    <button
      onClick={async () => {
        if (!feedbackText.trim()) return alert("Please enter feedback first!");

        const res = await fetch("http://localhost:3000/ai/refine-budget", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            income,
            expenses,
            customCategories,
            previousSuggestion: secondLayout,
            feedbackText
          }),
        });

        const data = await res.json();
        try {
          const cleaned = data.response
            .replace(/```json|```/g, "")
            .replace(/\\n/g, "")
            .trim();

          const parsed = JSON.parse(cleaned);
          setSecondLayout(parsed);
          // DO NOT clear feedback or close box – keep visible
        } catch (err) {
          console.error("❌ Failed to parse Gemini layout:", err.message);
          alert("Gemini didn’t return valid JSON.");
        }
      }}
    >
      🚀 Send to Gemini
    </button>

    {/* ✅ Gemini Response Displayed Here */}
    {secondLayout?.summary && (
      <div style={{ marginTop: "1rem", backgroundColor: "#f2f2f2", padding: "0.75rem", borderRadius: "8px" }}>
        <strong>📋 Gemini Summary:</strong> {secondLayout.summary}
      </div>
    )}

    {secondLayout?.notes && (
      <div style={{ marginTop: "1rem", backgroundColor: "#e9f5ff", padding: "0.75rem", borderRadius: "8px" }}>
        <strong>💬 Gemini Notes:</strong> {secondLayout.notes}
      </div>
    )}
  </div>
)}


</div>
  </div>
)}
    </div>
  );
}

export default App;


