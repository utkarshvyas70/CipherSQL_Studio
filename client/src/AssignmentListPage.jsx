import { useState, useEffect } from 'react';
import axios from 'axios';
import './AssignmentListPage.scss'; // We will create this next

const AssignmentListPage = () => {
  // State 1: Store the list of assignments
  const [assignments, setAssignments] = useState([]);
  
  // State 2: Track if data is loading or if there's an error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect: Fetch data when the component mounts
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // "axios" automatically converts JSON for us
        const response = await axios.get('http://localhost:5000/assignments');
        setAssignments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load assignments.');
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []); // Empty array [] means "run once on load"

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