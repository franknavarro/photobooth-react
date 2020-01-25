import React from 'react';

import 'components/TextContainer.css';

const TextContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  return (
    <div className={`text-container ${props.className}`}>
      <div>{props.children}</div>
    </div>
  );
};

export default TextContainer;
