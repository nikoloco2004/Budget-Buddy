import React, { useState } from 'react';
import BudgetDashboard from './components/BudgetDashboard';
import SavedBudgets from './components/SavedBudgets';
import BudgetChart from './components/BudgetChart';



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
  const [showSavedBudgets, setShowSavedBudgets] = useState(false);
  const [budgetName, setBudgetName] = useState('');

  const handleLoadBudget = (budget) => {
    setIncome(budget.income);
    setExpenses(budget.expenses || []);
    setCustomCategories(budget.customCategories || []);
    setLayoutData(null);      // 🧽 Clear initial Gemini layout (Dashboard UI)
    setSecondLayout(null);    // 🧽 Clear refined AI budget suggestion
    setFeedbackText('');      // 🧽 Clear feedback textbox
    setShowFeedbackBox(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  



<img
  src="/2.png"
  alt="Top Left Logo"
  style={{
    position: "scroll",
    top: "10px",
    left: "10px",
    width: "60px",
    height: "auto",
    zIndex: 1000
  }}
/>
  return (
    
    <div style={{ margin: 0, padding: 0 }}>
      <div
        style={{
          backgroundImage: "url('/2.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
          backgroundPosition: "center 0%", // 👈 pushed lower
          minHeight: "100vh",
          paddingTop: "100px",              // 👈 optional content push
          paddingBottom: "2rem",
          border: "2px solid black"         // DEBUG
        }}
      >
     

     <div style={{ textAlign: 'center', marginTop: '100px' }}>  
  <h1
    style={{
      fontFamily: 'Helvetica, Arial, sans-serif', // W E L C O M E Text  KadeMod
      fontWeight: 'bold',
      fontSize: '1.5rem', // smaller font size
      letterSpacing: '0.5em', // still spaced out nicely
      color: '#fff',
      textShadow: '0 0 5px black',
      margin: 0
    }}
  >
    WELCOME
  </h1>
</div>

<div className="description-section" style={{ textAlign: 'center', marginTop: '80px' }}>
  <p
    style={{
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 'normal',
      fontSize: '1.2rem', // slightly bigger
      letterSpacing: '0px',
      color: '#fff',
      textShadow: '0 0 3px black',
      margin: 0,
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto',
      lineHeight: '1.6'
    }}
  >
    Budget Buddy is an intelligent budgeting platform leveraging AI for financial clarity<br />
    with organized insights and smart suggestions.
  </p>
</div>




      
      <div style={{ padding: "1rem", maxWidth: "500px", margin: "auto", color:"#FFF" }}>
        {/* This section displays will contain lnading page */} 
        <h2
  style={{
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "1.3rem",
    letterSpacing: "0px",
    marginTop: "270px",
    color: "#fff",
    textAlign: "center"
  }} // WHAT IS MY MONTHLY INCOME???
>
  What is your monthly income?
</h2>

<div style={{ textAlign: "center", marginTop: "1rem" }}>
  <input
    type="number"
    placeholder="Enter amount..."   // BUTTON STYLE KADETOMOD: Enter amount... button
    value={income}
    onChange={(e) => setIncome(e.target.value)}
    style={{
      padding: "0.5rem",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "1rem",
      width: "200px"
    }}
  />
</div>

<h2
  style={{
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "1.3rem",
    letterSpacing: "0px",
    color: "#fff",
    textAlign: "center",  // KADEMOD: Reccuring Expenses header
    marginTop: "2rem"
  }}
>
  Add your recurring expenses.
</h2>

<input   // KADECONTMOD
  type="text"
  placeholder="Enter label..."
  value={category}
  onChange={(e) => setCategory(e.target.value)}
/>

        <input
          type="number"
          placeholder="Enter cost..."
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
        
        <ul
  style={{  // BULLET POINTS Starts here
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    listStyleType: "none",
    padding: 0,
    justifyContent: "center"
  }}
>
  {expenses.map((e, i) => (
    <li
      key={i}
      style={{
        fontFamily: "Open Sans, sans-serif",  // Updates Bullet points to horizontal
        fontWeight: "normal",          // KADEMOD: Hor. Bullet points
        fontSize: "1rem",
        color: "#fff"
      }}
    >
      {e.category}: ${e.amount}
    </li> // BULLET POITNS End here 
  ))} 
</ul> 

        <button // KADEMOD: Calculate Button Start --------------------------------------------------
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
  style={{
    backgroundColor: "rgba(181, 135, 255, 0.15)",  // soft purple fill
    color: "#e2c9ee",  // KADEMOD: Button Text Color
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "1.2rem",
    padding: "14px 36px",
    borderRadius: "10px",                          // fully rounded corners
    border: "3px solid #e2c9ee",                   // subtle hologram border
    boxShadow: "0 0 18px rgba(181, 135, 255, 0.35)", // soft glow effect
    textAlign: "center", // ADDED
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease" ,
    
    display: "block",     // makes it behave like a full-width element
    margin: "40px auto",  // 👈 centers it horizontally within its parent
  }}
  onMouseOver={(e) => {
    e.target.style.boxShadow = "0 0 28px rgba(181, 135, 255, 0.5)";
    e.target.style.transform = "scale(1.03)";
  }}
  onMouseOut={(e) => {
    e.target.style.boxShadow = "0 0 18px rgba(181, 135, 255, 0.35)";
    e.target.style.transform = "scale(1)";
  }}  // Calculate Button ENDS HERE!!!!! ------------------------------------------------------------
>
  Calculate 
</button>



      </div>

      {layoutData && <BudgetDashboard layoutData={layoutData} />} 
      

{layoutData && ( // ---------------------------------------------------------------------------------------
  <div style={{ padding: "1rem", maxWidth: "500px", margin: "auto", color: "#FFF" }}>
    <h2
      style={{
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        fontSize: "1.3rem",
        letterSpacing: "0px",
        color: "#fff",
        textAlign: "center",
        marginBottom: "1rem"
      }} // ---------------------------------------------------------------------------------------
    >
      What do you need budgeted?
    </h2>

    <input
      type="text"
      placeholder="Enter label..."
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


    <ul
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    listStyleType: "none",
    padding: 0,
    justifyContent: "center"
  }}
>
  {customCategories.map((cat, i) => (
    <li
      key={i}
      style={{
        fontFamily: "Open Sans, sans-serif",
        fontWeight: "normal",
        fontSize: "1rem",
        color: "#fff"
      }}
    >
      + {cat}
    </li>
  ))}
</ul>


<button
  onClick={async () => {
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
  }}
  style={{
    backgroundColor: "rgba(181, 135, 255, 0.15)",  // soft purple fill
    color: "#e2c9ee",  // matching text color
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "1.2rem",
    padding: "14px 36px",
    borderRadius: "10px",
    border: "3px solid #e2c9ee",
    boxShadow: "0 0 18px rgba(181, 135, 255, 0.35)",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "block",
    margin: "40px auto"
  }}
  onMouseOver={(e) => {
    e.target.style.boxShadow = "0 0 28px rgba(181, 135, 255, 0.5)";
    e.target.style.transform = "scale(1.03)";
  }}
  onMouseOut={(e) => {
    e.target.style.boxShadow = "0 0 18px rgba(181, 135, 255, 0.35)";
    e.target.style.transform = "scale(1)";
  }}
>
  Calculate
</button>


  </div>
)}
  {secondLayout && secondLayout.categories && (
    <div style={{ padding: "1rem", maxWidth: "500px", margin: "auto", color: "#FFF" }}>
    <h2
  style={{
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "1.3rem",
    letterSpacing: "0px",
    color: "#fff",
    textAlign: "center",
    marginBottom: "1rem"
  }} // KADETOMODE: Budget Recommendation Add to Table list
>
  Budget Recommendation
</h2>

<table
  style={{
    width: "60%", // tighter width
    borderCollapse: "collapse",
    margin: "2rem auto", // center horizontally
    backgroundColor: "transparent",
    fontFamily: "Open Sans, sans-serif",
    color: "#fff"
  }}
>
  <thead>
    <tr>
      <th style={{
        border: "1px solid #666",
        padding: "0.75rem",
        textAlign: "left"
      }}>Category</th>
      <th style={{
        border: "1px solid #666",
        padding: "0.75rem",
        textAlign: "left"
      }}>Amount ($)</th>
    </tr>
  </thead>
  <tbody>
    {[...secondLayout.categories]  // NICEST TABLE BODY
      .sort((a, b) => b.suggestedAmount - a.suggestedAmount)
      .map((cat, i) => (
        <tr
          key={i}
          style={{
            backgroundColor: i % 2 === 0 ? "#1a1a1a" : "#2a2a2a"
          }}
        >
          <td style={{
            border: "1px solid #666",
            padding: "0.75rem",
            textAlign: "left"
          }}>{cat.name}</td>
          <td style={{
            border: "1px solid #666",
            padding: "0.75rem",
            textAlign: "left"
          }}>${cat.suggestedAmount}</td>
        </tr>
      ))}
  </tbody>
</table>

      {/* ✅ Chart Below the Table */}
        <BudgetChart data={secondLayout.categories} />

      <button
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)", // subtle white fill
          color: "#fff", // white text
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "bold",
          fontSize: "1.1rem",
          padding: "14px 36px",
          borderRadius: "10px",
          border: "2px solid #fff", // bright white border
          boxShadow: "0 0 18px rgba(255, 255, 255, 0.3)", // soft white glow
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
          display: "block",
          margin: "40px auto"
        }}
        onMouseOver={(e) => {
          e.target.style.boxShadow = "0 0 28px rgba(255, 255, 255, 0.5)";
          e.target.style.transform = "scale(1.03)";
        }}
        onMouseOut={(e) => {
          e.target.style.boxShadow = "0 0 18px rgba(255, 255, 255, 0.3)";
          e.target.style.transform = "scale(1)";
        }}                
        onClick={() => {
          const { jsPDF } = require("jspdf");
          const doc = new jsPDF();
        
          doc.setFontSize(18);
          doc.text("Budget Buddy Report", 14, 20);
        
          let y = 30;
        
          // 💰 Income
          doc.setFontSize(14);
          doc.text(`Income: $${income}`, 14, y);
          y += 10;
        
          // 💸 Expenses
          doc.setFontSize(14);
          doc.text("Expenses:", 14, y);
          y += 8;
          doc.setFontSize(12);
          expenses.forEach((e) => {
            doc.text(`- ${e.category}: $${e.amount}`, 16, y);
            y += 7;
          });
        
          y += 5;
        
          // 🧾 Custom Categories
          if (customCategories.length > 0) {
            doc.setFontSize(14);
            doc.text("Custom Budget Categories:", 14, y);
            y += 8;
            doc.setFontSize(12);
            customCategories.forEach((cat) => {
              doc.text(`- ${cat}`, 16, y);
              y += 7;
            });
            y += 5;
          }
        
          // 📊 Suggested Budget
          if (secondLayout?.categories?.length) {
            doc.setFontSize(14);
            doc.text("Gemini Suggested Allocation:", 14, y);
            y += 8;
            doc.setFontSize(12);
            secondLayout.categories.forEach((cat) => {
              doc.text(`- ${cat.name}: $${cat.suggestedAmount}`, 16, y);
              y += 7;
            });
          }
        
          // 📋 Summary
          if (secondLayout?.summary) {
            y += 10;
            doc.setFontSize(14);
            doc.text("Summary:", 14, y);
            y += 8;
            doc.setFontSize(12);
            doc.text(doc.splitTextToSize(secondLayout.summary, 180), 14, y);
            y += doc.splitTextToSize(secondLayout.summary, 180).length * 7;
          }
        
          // 💬 Notes
          if (secondLayout?.notes) {
            y += 10;
            doc.setFontSize(14);
            doc.text("Notes:", 14, y);
            y += 8;
            doc.setFontSize(12);
            doc.text(doc.splitTextToSize(secondLayout.notes, 180), 14, y);
          }
          // 📊 Gemini Suggested Budget (with percentages)
          if (secondLayout?.categories?.length) {
            doc.setFontSize(14);
            y += 20; // 👈 Add space below the previous section
            doc.setFontSize(14);
            doc.text("Gemini Suggested Budget:", 14, y);
            y += 8;

            doc.setFontSize(12);

            const total = secondLayout.categories.reduce((sum, cat) => sum + cat.suggestedAmount, 0);

            secondLayout.categories.forEach((cat) => {
              const percent = ((cat.suggestedAmount / total) * 100).toFixed(1);
              const line = `- ${cat.name}: $${cat.suggestedAmount} (${percent}%)`;
              doc.text(line, 16, y);
              y += 7;
            });
          }

          // 🧾 Save it
          doc.save("budget-buddy-report.pdf");
        }}        
      >
        Export PDF
      </button>

    <div style={{ marginTop: "1rem", color:"#FFF" }}>
    <h3
  style={{
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "1.3rem",
    letterSpacing: "0px",
    color: "#fff",
    textAlign: "center",
    marginTop: "2rem"
  }}
>
  Name this budget.
</h3>

    <input
      type="text"
      placeholder="Enter name..."
      value={budgetName}
      onChange={(e) => setBudgetName(e.target.value)}
      style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", color:"#000" }}
    />
    <button
  onClick={async () => {
    const timestamp = new Date().toISOString();

    const res = await fetch("http://localhost:3000/save-budget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        income,
        expenses,
        customCategories,
        finalBudget: secondLayout.categories,
        timestamp,
        budgetName
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert("✅ Budget saved to MongoDB!");
    } else {
      alert("❌ Failed to save budget.");
    }
  }}
  style={{
    backgroundColor: "transparent",
    color: "#fff",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "1rem",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "2px solid #fff",
    boxShadow: "0 0 16px rgba(255, 255, 255, 0.35)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    minWidth: "150px",
    marginRight: "1rem" // spacing from adjacent "Refine" button
  }}
  onMouseOver={(e) => {
    e.target.style.boxShadow = "0 0 28px rgba(255, 255, 255, 0.5)";
    e.target.style.transform = "scale(1.03)";
  }}
  onMouseOut={(e) => {
    e.target.style.boxShadow = "0 0 16px rgba(255, 255, 255, 0.35)";
    e.target.style.transform = "scale(1)";
  }}
>
  Accept Budget
</button>





<button
  onClick={() => setShowFeedbackBox(true)}
  style={{
    
    backgroundColor: "transparent",
    display: "flex",
  justifyContent: "center", // optional: centers the row
  gap: "1.5rem",             // 👈 controls spacing between buttons
  marginTop: "1.5rem",

    color: "#fff",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "1rem",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "2px solid #fff",
    boxShadow: "0 0 16px rgba(255, 255, 255, 0.35)",
    cursor: "pointer",   // permanent shift
    transition: "none",
    minWidth: "150px",  // Ensures consistent width like "Export PDF",
  }
  }
  onMouseOver={(e) => {
    e.target.style.boxShadow = "0 0 28px rgba(255, 255, 255, 0.5)";
    e.target.style.transform = "scale(1.03)";
  }}
  onMouseOut={(e) => {
    e.target.style.boxShadow = "0 0 18px rgba(255, 255, 255, 0.3)";
    e.target.style.transform = "scale(1)";
  }}
>
  Refine
</button>


  {showFeedbackBox && (
  <div style={{ marginTop: "1rem" , color:"#FFF"}}>
    <h3>💬 Tell Gemini what you'd like to change:</h3>
    <textarea
      rows="4"
      style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", marginBottom: "0.5rem" , color:"#000"}}
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
      <div style={{ marginTop: "1rem", backgroundColor: "#f2f2f2", padding: "0.75rem", borderRadius: "8px" ,color:"#000"}}>
        <strong>📋 Gemini Summary:</strong> {secondLayout.summary}
      </div>
    )}

    {secondLayout?.notes && (
      <div style={{ marginTop: "1rem", backgroundColor: "#e9f5ff", padding: "0.75rem", borderRadius: "8px", color:"#000" }}>
        <strong>💬 Gemini Notes:</strong> {secondLayout.notes}
      </div>
    )}
  </div>
  
)}
    </div>
      </div>
    )}
        <div style={{ textAlign: "center", marginRight: "1rem" ,color:"#fff"}}>
      <button
        onClick={() => setShowSavedBudgets(!showSavedBudgets)}
      >
        {showSavedBudgets ? "📕 Hide Saved Budgets" : "📂 View Saved Budgets"}
      </button>
    </div>

    {showSavedBudgets && <SavedBudgets onLoadBudget={handleLoadBudget} />}
    </div>
    </div>
  );
}

export default App;


