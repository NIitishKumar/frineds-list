import { Heart, Users } from "lucide-react";
import React from "react";

const Fallback = ({ activeTab, searchTerm }) => {
  return (
    <div className="p-12 text-center">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {activeTab === "favorites" ? (
          <Heart className="w-10 h-10 text-slate-400" />
        ) : (
          <Users className="w-10 h-10 text-slate-400" />
        )}
      </div>
      <h3 className="font-semibold text-slate-700 mb-2">
        {searchTerm
          ? "No friends found"
          : activeTab === "favorites"
          ? "No favorite friends yet"
          : "No friends yet"}
      </h3>
      <p className="text-slate-500 text-sm">
        {searchTerm
          ? "Try adjusting your search terms"
          : activeTab === "favorites"
          ? "Star some friends to add them to favorites"
          : "Add some friends to get started"}
      </p>
    </div>
  );
};

export default Fallback;
