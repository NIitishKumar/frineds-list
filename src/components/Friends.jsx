import React, { useState } from "react";
import { useSelector } from "react-redux";
import FriendCard from "./FriendCard";
import Footer from "./Footer";
import Pagination from "./Pagination";
import Header from "./Header";
import Fallback from "./Fallback";
import InputSection from "./InputSection";

const FriendsList = () => {
  const friends = useSelector((state) => state.friends.list);

  const [newFriendName, setNewFriendName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredFriends = friends.filter((friend) => {
    const matchesSearch = friend.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "all" || (activeTab === "favorites" && friend.isFavorite);
    return matchesSearch && matchesTab;
  });

  const totalPages = Math.ceil(filteredFriends.length / itemsPerPage);
  const paginatedFriends = filteredFriends.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab]);

  const favoriteCount = friends.filter((f) => f.isFavorite).length;

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-xl rounded-3xl overflow-hidden border border-slate-200">
      {/* Header */}
      <Header
        favoriteCount={favoriteCount}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Search and Add Section */}
      <InputSection
        searchTerm={searchTerm}
        newFriendName={newFriendName}
        setSearchTerm={setSearchTerm}
        setNewFriendName={setNewFriendName}
      />

      {/* Friends List */}
      <div className="min-h-96">
        {filteredFriends.length === 0 ? (
          <Fallback activeTab={activeTab} searchTerm={searchTerm} />
        ) : (
          <div className="divide-y divide-slate-100">
            {paginatedFriends.map((friend, index) => (
              <FriendCard
                friend={friend}
                getInitials={getInitials}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredFriends.length > itemsPerPage && (
        <Pagination
          filteredFriends={filteredFriends}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}

      {/* Footer */}
      {friends.length > 0 && filteredFriends.length <= itemsPerPage && (
        <Footer
          filteredFriends={filteredFriends}
          favoriteCount={favoriteCount}
        />
      )}
    </div>
  );
};

export default FriendsList;
