import React from 'react';

const Poll = ({ poll, handleVote, hasVoted }) => {
  return (
    <div className="poll-container">
      <h3>{poll.question}</h3>
      <div className="poll-options">
        {poll.options.map(option => (
          <div key={option.id} className="poll-option">
            <input 
              type="radio" 
              id={`option-${option.id}`} 
              name={`poll-${poll.id}`} 
              value={option.id}
              onChange={() => handleVote(poll.id, option.id)}
              disabled={hasVoted} // Disable if user has already voted
            />
            <label htmlFor={`option-${option.id}`}>{option.text}</label>
          </div>
        ))}
        {hasVoted && <div className="voted-overlay">You have already voted!</div>}
      </div>
    </div>
  );
};

export default Poll;