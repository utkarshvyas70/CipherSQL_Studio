import AssignmentListPage from './AssignmentListPage';
import './App.css'; 

function App() {
  return (
    <div className="app-container">
      {/* Header */}
      <header style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #333' }}>
        <h1 style={{ margin: 0, color: '#61dafb' }}>CipherSQLStudio</h1>
      </header>

      {/* Main Content */}
      <main>
        <AssignmentListPage />
      </main>
    </div>
  );
}

export default App;