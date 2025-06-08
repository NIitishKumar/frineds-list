import { Search, UserPlus } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewFriend } from "../store/friendsSlice";
import { containsSpecialChars } from "../utils";

const InputSection = ({
  searchTerm,
  setSearchTerm,
  newFriendName,
  setNewFriendName,
}) => {
  const dispatch = useDispatch();
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addFriend();
    }
  };
  const addFriend = () => {
    if (newFriendName.trim()) {
      const newFriend = {
        id: Date.now(),
        name: newFriendName.trim(),
        isFavorite: false,
      };
      dispatch(addNewFriend({ friend: newFriend }));
      setNewFriendName("");
    }
  };

  const setInputName = (e) => {
    if (containsSpecialChars(e.target.value)) {
      alert(
        "Please enter a valid name without special characters or without numeric value."
      );
      return;
    }
    setNewFriendName(e.target.value);
    if (e.key === "Enter") {
      addFriend();
    }
  };
  return (
    <div className="p-6 space-y-4 bg-slate-50/50">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 placeholder-slate-400"
        />
      </div>
      {/* Add Friend */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Add new friend..."
          value={newFriendName}
          onChange={setInputName}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 placeholder-slate-400"
        />
        <button
          onClick={addFriend}
          disabled={!newFriendName.trim()}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium shadow-lg shadow-blue-500/25"
        >
          <UserPlus className="w-4 h-4" />
          Add
        </button>
      </div>
    </div>
  );
};

export default InputSection;
