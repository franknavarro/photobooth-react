import React from 'react';

const TextContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  return <div className={`text-container ${props.className}`}><span>{props.children}</span></div>;
};

export default TextContainer;
