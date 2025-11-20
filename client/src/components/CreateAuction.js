import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUsers, faGavel } from "@fortawesome/free-solid-svg-icons";

const CreateAuction = ({
  socket,
  user,
  setCreated,
  setJoin,
  setRoom,
  setMain,
}) => {
  const newAuction = () => {
    const room = uuidv4();
    socket.emit("createAuction", {
      username: user.username,
      room,
    });
    setCreated(true);
    setRoom(room);
    setMain(true);
  };

  const joinAuction = () => {
    setJoin(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Static background with subtle pattern */}
      <div className="absolute inset-0 bg-background-secondary">
        {/* Subtle grid pattern overlay */}
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
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-background-secondary to-slate-800/50"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <FontAwesomeIcon
              icon={faGavel}
              className="text-5xl text-primary mr-4"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Auction Hub
              </span>
            </h1>
          </div>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
            Start a new auction room or join an existing one to begin bidding on
            your favorite players
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full mt-4"></div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Auction Card */}
          <div className="glassmorphism p-8 rounded-2xl border border-white/20 backdrop-blur-xl hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mb-6 shadow-lg">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-3xl text-white"
                />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-3">
                Create Auction
              </h2>
              <p className="text-text-secondary text-sm md:text-base mb-6 leading-relaxed">
                Start your own auction room and become the host. Set up a new
                bidding session where you can invite other players to join and
                compete for the best talent.
              </p>
              <button
                onClick={newAuction}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-white font-semibold uppercase tracking-wide transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
              >
                Create New Room
              </button>
            </div>
          </div>

          {/* Join Auction Card */}
          <div className="glassmorphism p-8 rounded-2xl border border-white/20 backdrop-blur-xl hover:border-secondary/50 transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-purple-600 flex items-center justify-center mb-6 shadow-lg">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="text-3xl text-white"
                />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-3">
                Join Auction
              </h2>
              <p className="text-text-secondary text-sm md:text-base mb-6 leading-relaxed">
                Enter an existing auction room using a room ID. Join other
                bidders in real-time and compete to build your dream team
                through strategic bidding.
              </p>
              <button
                onClick={joinAuction}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-secondary via-purple-600 to-accent text-white font-semibold uppercase tracking-wide transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
              >
                Join Existing Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAuction;
