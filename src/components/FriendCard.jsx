import React from "react";
import { capitalizeFirstChar } from "../utils";
import { Heart, Star, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteFriend, toggleFavorite } from "../store/friendsSlice";

export default function FriendCard({
  friend,
  getInitials,
}) {
  const dispatch = useDispatch();
  return (
    <div
      key={friend.id}
      className="flex items-center justify-between p-6 hover:bg-slate-50/80 transition-all duration-200 group"
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
            {getInitials(friend.name)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-800 truncate">
              {friend.name}
            </h3>
            {friend.isFavorite && (
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            )}
          </div>
          <p className="text-sm text-slate-500">is your friend</p>
        </div>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => dispatch(toggleFavorite({ id: friend.id }))}
          className={`p-2.5 rounded-xl transition-all ${
            friend.isFavorite
              ? "bg-red-50 text-red-600 hover:bg-red-100"
              : "bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500"
          }`}
          title={
            friend.isFavorite ? "Remove from favorites" : "Add to favorites"
          }
        >
          <Star
            className={`w-4 h-4 ${friend.isFavorite ? "fill-current" : ""}`}
          />
        </button>

        <button
          onClick={() => dispatch(deleteFriend({ id: friend.id }))}
          className="p-2.5 rounded-xl bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
          title="Remove friend"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
