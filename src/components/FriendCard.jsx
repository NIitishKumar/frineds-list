import React from 'react';
import { capitalizeFirstChar } from '../utils';

export default function FriendCard({ friend, onDelete, onToggleFavorite }) {
  return (
    <div className='cardContainer'>
      <div className='cardHeader border'>
        <h3 className='name'><span style={{ color: 'black' }}>Name : </span>{capitalizeFirstChar(friend.name)}</h3>
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