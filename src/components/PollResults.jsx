import React from 'react';

const PollResults = ({ poll }) => {
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
  
  // Find the highest vote count in this poll
  const maxVotes = Math.max(...poll.options.map(o => o.votes));

  return (
    <div className="poll-results-container">
      <h3>{poll.question}</h3>
      <div className="results-options">
        {poll.options.map(option => {
          const percentage = totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(1) : 0;
          
          // Check if this option is a top result
          const isTopResult = maxVotes > 0 && option.votes === maxVotes;

          return (
            <div key={option.id} className="result-option">
              <div className="result-info">
                <span className={isTopResult ? 'top-result' : ''}>{option.text}</span>
                <span>{option.votes} votes ({percentage}%)</span>
              </div>
              <div className="result-bar-background">
                <div 
                  className={`result-bar-foreground ${isTopResult ? 'top-result-bar' : ''}`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollResults;