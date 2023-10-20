// CustomBlockEditor.tsx
import React from 'react';

const customStyles = {
  // Add your custom styles here
  cursor: 'pointer',
  border: '1px dotted #333',
};

const CustomBlockEditor = (props) => {
  return (
    <div id="sectionContent" style={customStyles} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default CustomBlockEditor;
