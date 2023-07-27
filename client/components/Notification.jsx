import React from 'react';

export function Notification({ onClick, title, status }) {
  return (
    <div
      className='notify'
      onClick={onClick}
      style={{ backgroundColor: `${status === 'success' ? 'lightgreen' : 'yellow'}` }}
    >
      <p className='notify__text'>{title}</p>
    </div>
  );
}
