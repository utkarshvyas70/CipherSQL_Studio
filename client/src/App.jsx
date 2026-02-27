import AssignmentListPage from './AssignmentListPage';
import SqlEditor from './SqlEditor'; 
import './App.scss'; 

function App() {
  return (
    <div className="app-container">
      <header style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #333' }}>
        <h1 style={{ margin: 0, color: '#61dafb' }}>CipherSQLStudio</h1>
      </header>

      <main style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        <AssignmentListPage />
        <hr style={{ borderColor: '#444', margin: '30px 0' }} />
        <SqlEditor />
      </main>
    </div>
  );
}

export default App;