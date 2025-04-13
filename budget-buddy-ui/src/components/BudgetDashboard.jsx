import React from 'react';

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Helvetica, Arial, sans-serif',
    background: 'transparent',
    color: '#000',
  },
  card: {
    textAlign: 'center',
    margin: '2rem auto',
    fontSize: "0.9rem",
    maxWidth: '600px', // keeps it from stretching too far
  },
  table: {
    width: '60%',
    borderCollapse: 'collapse',
    margin: '2rem auto',
    backgroundColor: 'transparent',
  },
  thtd: {
    border: '1px solid #666',
    padding: '0.5rem 1rem',
    textAlign: 'left',
    color: '#fff',
    fontWeight: 'normal',
    fontFamily: 'Open Sans, sans-serif',
  },
  stripedRow: (index) => ({
    backgroundColor: index % 2 === 0 ? '#1a1a1a' : '#2a2a2a',
  }),
  // ... other styles
};



const BudgetDashboard = ({ layoutData }) => {
    const elements = layoutData?.ui?.components?.filter(c => c.type.toLowerCase() !== 'form');

  if (!elements) return <p>No layout data available.</p>;

  return (
    <div style={styles.container}>
      {elements.map((component, index) => {
        switch (component.type.toLowerCase()) {
          case 'card':
            return (
              <div key={index} style={styles.card}>
                <h2>{component.title}</h2>
                {(component.content || []).map((c, i) => {
                if (typeof c === 'string') {
                    return <p key={i}>{c}</p>;
                } else if (typeof c === 'object') {
                    return <p key={i}>{c.text || c.value || JSON.stringify(c)}</p>;
                } else {
                    return <p key={i}>{String(c)}</p>;
                }
                })}
              </div>
            );

          case 'table':
            return (
              <div key={index}>
                <h2
  style={{
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "1.3rem",
    textAlign: "center", // 👈 center the heading
    marginTop: "2rem",
    color: "#fff"
  }}
>
  {component.title}
</h2>

                <table style={styles.table}>
                  <thead>
                    <tr>
                      {component.headers.map((h, i) => (
                        <th key={i} style={styles.thtd}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                  {component.data.map((row, ri) => (
                    <tr key={ri}>
                        {Array.isArray(row)
                        ? row.map((cell, ci) => (
                            <td key={ci} style={styles.thtd}>{cell}</td>
                            ))
                        : Object.values(row).map((cell, ci) => (
                            <td key={ci} style={styles.thtd}>{cell}</td>
                            ))}
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'form':
            return (
              <form key={index} style={styles.formSection} onSubmit={(e) => {
                e.preventDefault();
                alert('Form submitted (you can hook this to MongoDB)');
              }}>
                <h2>{component.title}</h2>
                {component.fields.map((field, i) => (
                  <div key={i}>
                    <label>{field.label}</label><br />
                    {field.type === 'dropdown' ? (
                      <select name={field.label} style={styles.input}>
                        {field.options.map((opt, oi) => (
                          <option key={oi} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input type={field.type} name={field.label} placeholder={field.label} style={styles.input} />
                    )}
                  </div>
                ))}
                <button type="submit">{component.submit_button_text || "Submit"}</button>
              </form>
            );

          default:
            return (
              <div key={index}>
                ⚠️ Unsupported component type: <strong>{component.type}</strong>
              </div>
            );
        }
      })}
    </div>
  );
};

export default BudgetDashboard;

