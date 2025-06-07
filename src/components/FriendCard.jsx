import React from 'react';

export default function FriendCard({ friend, onDelete, onToggleFavorite }) {
  return (
    <div className='cardContainer'>
      <div className='cardHeader'>
        <h2>{friend.name?.toUpperCase()}</h2>
        <p>{friend.favorite ? '⭐️' : ''}</p>
      </div>

      <div className='cardHeader'>
        <button
          className='button'
          id='addToFavouriteButton'
          onClick={onToggleFavorite}
        > Add to favourite ⭐️</button>
        <button
          className='button'
          color='white'
          style={{ color: 'white' }}
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this friend?')) {
              onDelete();
            }
          }}
        >Delete</button>
      </div>
    </div>
  );
}