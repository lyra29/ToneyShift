import React from 'react';

const ToneDisplay = ({ text, tone, onCopy }) => {
  if (!text) return null;

  return (
    <div className={`tone-display ${tone}`}>
      <div className="tone-header">
        <span className={`tone-badge ${tone}`}>
          {tone === 'formal' ? 'Formal' : ' Informal'}
        </span>
        <button 
          onClick={() => onCopy(text)}
          className="copy-btn"
          title="Copy to clipboard"
        >
          📋
        </button>
      </div>
      <div className="text-content">
        {text}
      </div>
    </div>
  );
};

export default ToneDisplay;