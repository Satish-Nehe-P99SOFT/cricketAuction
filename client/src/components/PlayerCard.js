import PlayerStats from "./PlayerStats";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const PlayerCard = ({ image, name, squad, stats }) => {
  // Using open-source placeholder images from:
  // Primary: Unsplash Source API (https://source.unsplash.com/)
  //   - Free, open-source photos from Unsplash
  //   - Sports/cricket category images
  // Fallback: UI Avatars API (https://ui-avatars.com/)
  //   - Free, open-source avatar generator
  //   - Creates avatar with player's initials
  // Other alternatives:
  //   - DiceBear: https://avatars.dicebear.com/ (avatar generator)
  //   - Picsum: https://picsum.photos/ (random placeholder)
  const defaultPlayerImage = `https://source.unsplash.com/400x400/?cricket,player,sports&sig=${
    name || Math.random()
  }`;
  const hasImage = image && image.trim() !== "";

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  const getRoleColor = (role) => {
    if (!role) return "from-gray-500 to-gray-600";
    const roleLower = role.toLowerCase();
    if (roleLower.includes("bat")) return "from-blue-500 to-blue-600";
    if (roleLower.includes("bowl")) return "from-red-500 to-red-600";
    if (roleLower.includes("all")) return "from-purple-500 to-purple-600";
    if (roleLower.includes("wicket")) return "from-green-500 to-green-600";
    return "from-gray-500 to-gray-600";
  };

  return (
    <div className="w-full max-w-sm glassmorphism p-6 rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl hover:border-primary/50 transition-all duration-300">
      {/* Player Image Section */}
      <div className="relative w-full flex flex-col items-center mb-6">
        <div className="relative w-48 h-48 rounded-2xl overflow-hidden mb-4 border-4 border-white/10 shadow-xl">
          {hasImage ? (
            <img
              src={image}
              alt={name || "Player profile"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = defaultPlayerImage;
                e.target.onerror = null;
              }}
            />
          ) : (
            <img
              src={defaultPlayerImage}
              alt="Default player avatar"
              className="w-full h-full object-cover bg-gradient-to-br from-slate-700 to-slate-900"
              onError={(e) => {
                // Fallback to UI Avatars if Unsplash fails
                const playerName = name || "Player";
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  playerName
                )}&background=3b82f6&color=fff&size=400&bold=true`;
                e.target.onerror = null;
              }}
            />
          )}
        </div>

        {/* Player Name */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-1">
            {name || "Unknown Player"}
          </h2>
          {squad && <p className="text-sm text-text-muted">{squad}</p>}
        </div>
      </div>

      {/* Role Badge */}
      {stats?.role && (
        <div className="mb-6 flex justify-center">
          <div
            className={`px-4 py-2 rounded-full bg-gradient-to-r ${getRoleColor(
              stats.role
            )} text-white font-semibold text-sm uppercase tracking-wide shadow-lg`}
          >
            {stats.role}
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="space-y-4">
        {stats?.batting && stats?.bowling ? (
          <div className="w-auto">
            <Slider {...settings}>
              <div className="px-2">
                <PlayerStats stats={stats.batting} role="Batting" />
              </div>
              <div className="px-2">
                <PlayerStats stats={stats.bowling} role="Bowling" />
              </div>
            </Slider>
          </div>
        ) : stats?.batting ? (
          <div className="px-2">
            <PlayerStats stats={stats.batting} role="Batting" />
          </div>
        ) : stats?.bowling ? (
          <div className="px-2">
            <PlayerStats stats={stats.bowling} role="Bowling" />
          </div>
        ) : (
          <div className="text-center py-4 text-text-muted">
            <FontAwesomeIcon
              icon={faUser}
              className="text-3xl mb-2 opacity-50"
            />
            <p className="text-sm">No stats available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
