import React, { useState } from 'react';

export default function Text() {
  const [text, setText] = useState('Text');

  const handleSetText = () => {
    setText(`${text}+1`);
  };

  return (
    <ul>
      <li id="text">{text}</li>
      <li>
        <button id="btn" type="button" onClick={handleSetText}>
          Set text
        </button>
      </li>
    </ul>
  );
}
