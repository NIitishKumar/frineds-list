import { Heart } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const Footer = ({ filteredFriends, favoriteCount }) => {
  const friends = useSelector((state) => state.friends.list);
  return (
    <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200" data-testid="footer" id="footer">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4 text-slate-600">
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3 text-red-500 fill-current" />
            {favoriteCount} favorites
          </span>
        </div>
        <span className="text-slate-500">
          {filteredFriends.length} of {friends.length}
        </span>
      </div>
    </div>
  );
};

export default Footer;
