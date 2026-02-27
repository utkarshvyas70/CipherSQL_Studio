import { useState } from 'react';
import axios from 'axios';
import Editor from "@monaco-editor/react"; 
import './App.scss'; 

const SqlEditor = () => {
  const [query, setQuery] = useState("SELECT * FROM users;");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);

  const executeQuery = async () => {
    setError(null);
    setResults([]);
    try {
      const response = await axios.post('http://localhost:5000/execute', { sql: query });
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to execute query.");
    }
  };

  const getHint = async () => {
    setHint("Thinking...");
    try {
      const response = await axios.post('http://localhost:5000/hint', {
        task: "Select all users", 
        currentQuery: query
      });
      setHint(response.data.hint);
    } catch (err) {
      setHint("Could not get a hint.");
    }
  };

  return (
    <div className="sql-editor-container">
      
      {/* 2. Schema Viewer (Requirement #2) */}
      <div className="schema-panel">
        <small><strong>Available Tables:</strong></small>
        <div className="schema-tag">
          📦 <strong>users</strong> (id, name, email, role)
        </div>
        <div className="schema-tag">
          📄 <strong>assignments</strong> (id, title, description)
        </div>
      </div>

      <h3>SQL Playground</h3>

      {/* 3. The Professional Editor (Requirement #1) */}
      <div className="editor-wrapper">
        <Editor
          height="200px"
          defaultLanguage="sql"
          theme="vs-dark"
          value={query}
          onChange={(value) => setQuery(value)}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
      
      
      <div className="button-row">
        <button onClick={executeQuery} className="run-btn">Run Query ▶</button>
        <button onClick={getHint} className="hint-btn">💡 Get Hint</button>
      </div>

      
      {hint && <div className="hint-box"><strong>AI Hint:</strong> {hint}</div>}
      {error && <div className="error-box">⚠️ {error}</div>}

      {results.length > 0 && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {Object.keys(results[0]).map((key) => <th key={key}>{key}</th>)}
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((val, i) => <td key={i}>{val}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SqlEditor;