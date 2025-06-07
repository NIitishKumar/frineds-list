
// File: src/components/FriendList.jsx
import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFriend, deleteFriend, toggleFavorite, sortByFavorite } from '../store/friendsSlice';
import FriendCard from './FriendCard';
import { containsSpecialChars } from '../utils';

export default function FriendList() {
    const [search, setSearch] = useState('');
    const [input, setInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const friends = useSelector((state) => state.friends.list);
    const dispatch = useDispatch();
    const perPage = 4;
  
    const handleAdd = (e) => {
      const name = input.trim();
      if (name && !friends.some(f => f.name.toLowerCase() === name.toLowerCase())) {
        dispatch(addFriend(name));
        setInput('');
        setCurrentPage(1);
      };
        document.getElementById('addFriendInput').focus();
    };
  
  
      const filtered = useMemo(() => {
        return friends.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
          .sort((a, b) => b.favorite - a.favorite);
      }, [friends, search]);
    

  const totalPages = useMemo(() => {
    return Math.ceil(filtered.length / perPage);
  }, [filtered]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, currentPage]);

  const setInputName = (e) => { 
    if (containsSpecialChars(e.target.value)) {
      alert('Please enter a valid name without special characters or without numeric value.');
      return;
    }
    setInput(e.target.value);
    if (e.key === 'Enter') {
      handleAdd();
    }
}

    return (
      <div id='friendListContainer'>
        <div style={{ minWidth: '300px' }}>
          <input
              type="text"
              value={input}
              onChange={setInputName}
              placeholder="Add new friend"
              className='inputField'
              id='addFriendInput'
            />
            <button className='addButton' id='addFriendBtn' onClick={handleAdd}>Add</button>
        </div>
        <div className='contentContainer'>
            <div className='filterContainer'>
              <input
                      type="text"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search friends"
                      className='inputField'
                      id='searchInput'
              />
            </div>
                <div className='cards'>
                  {paginated.map(friend => (
                    <FriendCard
                        key={friend.name}
                        friend={friend}
                        onDelete={() => dispatch(deleteFriend(friend.name))}
                        onToggleFavorite={() => dispatch(toggleFavorite(friend.name))}
                    />
                  ))}
                </div>
        
                {totalPages > 1 && (
                <div className='pagination'>
                    <span id='totalPagesCount' >Total :{friends.length}</span>
                    {[...Array(totalPages)].map((_, idx) => (
                    <button
                        className={currentPage === (idx + 1) ? 'activePage' : 'pageButton'}
                        key={idx}
                        onClick={() => setCurrentPage(idx + 1)}
                    >
                        {idx + 1}
                    </button>
                    ))}
                </div>
                )}
        </div>
      </div>
    );
  }