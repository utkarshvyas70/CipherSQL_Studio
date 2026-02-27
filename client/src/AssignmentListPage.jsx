import { useState, useEffect } from 'react';
import axios from 'axios';
import './AssignmentListPage.scss'; 

const AssignmentListPage = () => {
  
  const [assignments, setAssignments] = useState([]);
  
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        
        const response = await axios.get('http://localhost:5000/assignments');
        setAssignments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load assignments.');
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []); 

  if (loading) return <div className="status">Loading assignments...</div>;
  if (error) return <div className="status error">{error}</div>;

  return (
    <div className="assignment-list">
      <h2>Available Assignments</h2>
      <div className="card-container">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="card">
            <h3>{assignment.title}</h3>
            <p>{assignment.description}</p>
            <button>Start Challenge</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentListPage;