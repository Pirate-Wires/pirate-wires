// CustomBlockEditor.tsx
import React from 'react';

const customStyles = {
  // Add your custom styles here
  background: 'rgb(0 170 255 / 27%)',
};

const CustomBlockEditor = (props) => {
  return (
    <span id="sectionContent" style={customStyles} onClick={props.onClick}>
      {props.children}
    </span>
  );
};

export default CustomBlockEditor;
