import React from 'react';

function Status({ investment }) {
  return (
    <div className="status">
      <div className="status-item">
        <span>My Investment: ${investment}</span>
      </div>
    </div>
  );
}

export default Status;
