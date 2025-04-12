import React from 'react';

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'sans-serif',
    background: '#1e1e2f',
    color: '#fff',
  },
  card: {
    background: `url('/img/card-bg.jpg') no-repeat center center / cover`,
    padding: '1rem',
    borderRadius: '12px',
    marginBottom: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    color: '#fff',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '2rem',
  },
  thtd: {
    border: '1px solid #444',
    padding: '0.75rem',
    textAlign: 'left',
  },
  formSection: {
    background: '#2d2d3f',
    padding: '1rem',
    borderRadius: '10px',
  },
  input: {
    margin: '0.5rem 0',
    padding: '0.5rem',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
  }
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
                <h2>{component.title}</h2>
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

