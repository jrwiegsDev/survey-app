import { useState, useEffect } from 'react';
import './App.css';
import Poll from './components/Poll';
import PollResults from './components/PollResults';

// The base URL for the backend API
const API_URL = 'https://survey-app-backend-mzcr.onrender.com/api';

function App() {
  const [polls, setPolls] = useState([]);
  const [votedPolls, setVotedPolls] = useState(() => {
    // Check localStorage for a record of previously voted polls
    return JSON.parse(localStorage.getItem('votedPolls')) || {};
  });

  // Fetch all poll data from the server on initial component load
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch(`${API_URL}/polls`);
        const data = await response.json();
        setPolls(data);
      } catch (error) {
        console.error("Failed to fetch polls:", error);
      }
    };
    fetchPolls();
  }, []);

  // Send a vote to the server and update the UI
  const handleVote = async (pollId, optionId) => {
    if (votedPolls[pollId]) {
      alert('You have already voted in this poll!');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/polls/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pollId, optionId }),
      });
      const updatedPolls = await response.json();
      
      // Update the UI with the fresh data from the server
      setPolls(updatedPolls);

      // Mark this poll as voted in localStorage for this session
      const newVotedPolls = { ...votedPolls, [pollId]: true };
      setVotedPolls(newVotedPolls);
      localStorage.setItem('votedPolls', JSON.stringify(newVotedPolls));
    } catch (error) {
      console.error("Failed to submit vote:", error);
    }
  };

  // Clear the user's voting record from localStorage for this session
  const handleResetVotes = () => {
    localStorage.removeItem('votedPolls');
    setVotedPolls({});
    alert('Your votes have been reset for this session!');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Polling & Live Results</h1>
        <button className="reset-button" onClick={handleResetVotes}>
          Reset My Votes
        </button>
      </header>
      <main className="main-content">
        <div className="polls-column">
          <h2>Questions</h2>
          <div className="polls-grid">
            {polls.map(poll => (
              <Poll 
                key={poll.id} 
                poll={poll} 
                handleVote={handleVote} 
                hasVoted={votedPolls[poll.id]}
              />
            ))}
          </div>
        </div>
        <div className="results-column">
          <h2>Results</h2>
          <div className="results-grid">
            {polls.map(poll => (
              <PollResults key={poll.id} poll={poll} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;