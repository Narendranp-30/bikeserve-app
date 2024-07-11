import React from 'react';
import EmailNotification from './EmailNotification';

const NotificationList = ({ notifications }) => {
  return (
    <div className="notification-list">
      {notifications.map((notification, index) => (
        <EmailNotification key={index} message={notification.message} />
      ))}
    </div>
  );
};

export default NotificationList;
