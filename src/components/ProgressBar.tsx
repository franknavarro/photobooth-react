import React from 'react';

import 'components/ProgressBar.css';

interface ProgressBarProps {
  completed: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completed }) => {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${completed}%` }} />
    </div>
  );
};

export default ProgressBar;
