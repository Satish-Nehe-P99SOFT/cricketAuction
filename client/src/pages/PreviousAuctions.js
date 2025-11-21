import { useState, useEffect } from "react";
import { fetchAuctions } from "../services/auction.service";
import PlayerCard from "../components/PlayerCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHistory,
  faTrophy,
  faUsers,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const PreviousAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [clicked, setClicked] = useState(0);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchAuctions()
      .then((data) => {
        setAuctions(data.auctions || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  const auctionClick = (index) => {
    setCurrent(index);
    setClicked(0);
  };

  const userClick = (index) => {
    setClicked(index);
  };

  const currentAuction = auctions[current];
  const currentUser = currentAuction?.auction?.[clicked];

  const getTotalPlayers = (user) => {
    if (!user) return 0;
    return (
      (user.batsmen?.length || 0) +
      (user.wicketKeepers?.length || 0) +
      (user.allRounders?.length || 0) +
      (user.bowlers?.length || 0) +
      (user.unknown?.length || 0)
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading auctions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background-secondary">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-background-secondary to-slate-800/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <FontAwesomeIcon
              icon={faHistory}
              className="text-5xl text-primary mr-4"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Previous Auctions
              </span>
            </h1>
          </div>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-4">
            Review past auction results and explore team compositions
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full"></div>
        </div>

        {auctions.length > 0 ? (
          <div className="space-y-8">
            {/* Auction Selection Tabs */}
            <div className="glassmorphism p-6 rounded-2xl border border-white/20 backdrop-blur-xl">
              <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faTrophy} className="text-primary" />
                Select Auction
              </h2>
              <div className="flex gap-3 flex-wrap">
                {auctions.map((a, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => auctionClick(index)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                        current === index
                          ? "bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-lg scale-105"
                          : "bg-background-tertiary/50 text-text-primary border border-white/10 hover:border-primary/50 hover:scale-105"
                      }`}
                    >
                      <FontAwesomeIcon icon={faTrophy} />
                      <span>Auction {index + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* User Selection Cards */}
            {currentAuction?.auction && currentAuction.auction.length > 0 && (
              <div className="glassmorphism p-6 rounded-2xl border border-white/20 backdrop-blur-xl">
                <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faUsers} className="text-primary" />
                  Select Team
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {currentAuction.auction.map((u, index) => {
                    const totalPlayers = getTotalPlayers(u);
                    return (
                      <button
                        key={index}
                        onClick={() => userClick(index)}
                        className={`p-4 rounded-xl transition-all duration-300 text-left border-2 ${
                          clicked === index
                            ? "border-primary bg-primary/10 shadow-lg scale-105"
                            : "border-white/10 bg-background-tertiary/50 hover:border-primary/50 hover:scale-105"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <FontAwesomeIcon
                              icon={faUser}
                              className="text-white text-sm"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-text-primary">
                              {u?.user || `User ${index + 1}`}
                            </h3>
                            <p className="text-xs text-text-muted">
                              {totalPlayers} players
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Player Cards by Role */}
            {currentUser ? (
              <div className="space-y-8">
                {/* Team Summary */}
                <div className="glassmorphism p-6 rounded-2xl border border-white/20 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} className="text-white" />
                      </div>
                      {currentUser?.user || "Team"}&apos;s Squad
                    </h2>
                    <div className="px-4 py-2 bg-primary/20 border border-primary/50 rounded-full">
                      <span className="text-primary font-semibold">
                        {getTotalPlayers(currentUser)} Players
                      </span>
                    </div>
                  </div>
                </div>

                {/* Batsmen Section */}
                {currentUser.batsmen?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">B</span>
                      </div>
                      <h3 className="text-xl font-bold text-text-primary">
                        Batsmen ({currentUser.batsmen.length})
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentUser.batsmen.map((b, index) => (
                        <PlayerCard
                          key={b?.image || `batsman-${index}`}
                          {...b}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Wicket Keepers Section */}
                {currentUser.wicketKeepers?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">WK</span>
                      </div>
                      <h3 className="text-xl font-bold text-text-primary">
                        Wicket Keepers ({currentUser.wicketKeepers.length})
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentUser.wicketKeepers.map((w, index) => (
                        <PlayerCard
                          key={w?.image || `wicket-${index}`}
                          {...w}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* All Rounders Section */}
                {currentUser.allRounders?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">AR</span>
                      </div>
                      <h3 className="text-xl font-bold text-text-primary">
                        All Rounders ({currentUser.allRounders.length})
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentUser.allRounders.map((ar, index) => (
                        <PlayerCard
                          key={ar?.image || `allrounder-${index}`}
                          {...ar}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Bowlers Section */}
                {currentUser.bowlers?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          BWL
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-text-primary">
                        Bowlers ({currentUser.bowlers.length})
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentUser.bowlers.map((bowl, index) => (
                        <PlayerCard
                          key={bowl?.image || `bowler-${index}`}
                          {...bowl}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Unknown Section */}
                {currentUser.unknown?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">?</span>
                      </div>
                      <h3 className="text-xl font-bold text-text-primary">
                        Unknown ({currentUser.unknown.length})
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentUser.unknown.map((u, index) => (
                        <PlayerCard
                          key={u?.image || `unknown-${index}`}
                          {...u}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {getTotalPlayers(currentUser) === 0 && (
                  <div className="glassmorphism p-12 rounded-2xl border border-white/20 backdrop-blur-xl text-center">
                    <FontAwesomeIcon
                      icon={faUsers}
                      className="text-6xl text-text-muted mb-4 opacity-30"
                    />
                    <p className="text-xl text-text-muted font-medium">
                      No players in this team
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="glassmorphism p-12 rounded-2xl border border-white/20 backdrop-blur-xl text-center">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-6xl text-text-muted mb-4 opacity-30"
                />
                <p className="text-xl text-text-muted font-medium">
                  Select a team to view their players
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="glassmorphism p-12 rounded-2xl border border-white/20 backdrop-blur-xl text-center">
            <FontAwesomeIcon
              icon={faHistory}
              className="text-6xl text-text-muted mb-4 opacity-30"
            />
            <p className="text-xl text-text-muted font-medium mb-2">
              No previous auctions available
            </p>
            <p className="text-sm text-text-muted">
              Complete an auction to see it here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousAuctions;
