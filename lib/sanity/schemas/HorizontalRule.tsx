// CustomBlockEditor.tsx
import React from 'react';

const HorizontalRule = (props) => {
  return (
    <span style={customStyles}>
      {props.children}
    </span>
);
};

const customStyles = {
  // Add your custom styles here
  background: 'rgb(0 170 255 / 27%)'
};

export default HorizontalRule;
