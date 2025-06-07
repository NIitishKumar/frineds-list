import { Users } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const Header = ({ favoriteCount, activeTab, setActiveTab }) => {
  const friends = useSelector((state) => state.friends.list);
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-8">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Friends</h1>
              <p className="text-slate-300 text-sm">Manage your connections</p>
            </div>
          </div>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`backdrop-blur-sm rounded-xl p-3 text-center transition-all ${
              activeTab === "all"
                ? "bg-white/20 ring-2 ring-white/30"
                : "bg-white/10 hover:bg-white/15"
            }`}
          >
            <div className="text-xl font-bold text-white">{friends.length}</div>
            <div className="text-xs text-slate-300">All Friends</div>
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`backdrop-blur-sm rounded-xl p-3 text-center transition-all ${
              activeTab === "favorites"
                ? "bg-white/20 ring-2 ring-white/30"
                : "bg-white/10 hover:bg-white/15"
            }`}
          >
            <div className="text-xl font-bold text-amber-400">
              {favoriteCount}
            </div>
            <div className="text-xs text-slate-300">Favorites</div>
          </button>
        </div>

        {/* Active Tab Indicator */}
        <div className="text-center">
          <span className="text-white/80 text-sm font-medium">
            {activeTab === "all" ? "All Friends" : "Favorite Friends"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
