import React from 'react';

const EmailNotification = ({ message }) => {
  return (
    <div className="email-notification">
      <p>{message}</p>
    </div>
  );
};

export default EmailNotification;
