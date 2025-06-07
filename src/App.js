// File: src/App.jsx
import React from 'react';
import FriendList from './components/friendsList';

export default function App() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1 className="heading">Friends List</h1>
      </div>
      <div className="container">
        <div className='card-container'>
        <h1 className="heading">Add Friend</h1>
          <FriendList />
        </div>
      </div>
    </div>
  );
}
