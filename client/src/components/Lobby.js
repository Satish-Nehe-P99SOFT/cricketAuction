import { useEffect, useState } from "react";

const Lobby = ({
  socket,
  code,
  setErrors,
  error,
  users,
  main,
  user,
  setCreated,
  setJoin,
}) => {
  const [playersPreview, setPlayersPreview] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    socket.on("start-error", (data) => {
      setErrors((prev) => ({
        ...prev,
        lobby: data.message,
      }));
    });

    socket.on("players-preview", (data) => {
      setPlayersPreview(data.players || []);
    });

    // Request players preview when component mounts
    socket.emit("request-players-preview", { room: code });

    return () => {
      socket.off("start-error");
      socket.off("players-preview");
    };
  }, [socket, setErrors, code]);

  const copyToClipboard = () => {
    if ("clipboard" in navigator) navigator.clipboard.writeText(code);
    else document.execCommand("copy", true, code);
    alert("Code successfully copied to the clipboard!");
  };

  const start = () => {
    if (users.length < 2) {
      return setErrors((prev) => ({
        ...prev,
        lobby: "At least two users should join for the auction to start.",
      }));
    }
    socket.emit("requestPlay", {
      room: code,
    });
  };

  const exit = () => {
    socket.emit("exit", {
      room: code,
      user: user.username,
    });
    setCreated(false);
    setJoin(false);
  };

  return (
    <>
      <div className="glassmorphism min-h-screen flex items-center justify-center text-xl">
        <div className="mx-auto py-4 px-1 w-[45rem] h-auto rounded-md glassmorphism border-none bg-background-tertiary">
          <div className="p-1 text-center tracking-[1.5px] m-4 flex flex-col">
            <div>
              Share the code{" "}
              <span>
                <p
                  className="cursor-pointer text-theme"
                  onClick={copyToClipboard}
                >
                  {code}
                </p>
              </span>{" "}
              with your friends to join the auction.
            </div>
            <div className="mt-4 text-hover">
              Users joined:{" "}
              {users.map((user) => {
                return <div key={user.user}>{user.user}</div>;
              })}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            {playersPreview.length > 0 && (
              <div className="w-full">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="relative inline-block px-5 py-2 rounded-[30px] transition-transform duration-500 uppercase font-bold overflow-hidden border-none outline-none bg-theme-3 z-10 cursor-pointer before:z-[-1] before:content-[''] before:h-[200%] before:w-[200%] before:absolute before:top-full before:left-[-50%] before:right-0 before:bottom-0 before:rounded-full before:bg-theme before:transition-transform before:duration-500 hover:before:translate-y-[-2.7rem] text-sm"
                >
                  {showPreview ? "Hide" : "Show"} Players Preview (
                  {playersPreview.length})
                </button>
                {showPreview && (
                  <div className="mt-4 max-h-96 overflow-y-auto bg-background-tertiary rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3 text-center">
                      Players to be Auctioned
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {playersPreview.map((player, index) => (
                        <div
                          key={player._id || index}
                          className="p-3 bg-background-secondary rounded-lg text-center"
                        >
                          <p className="font-semibold text-sm">{player.name}</p>
                          <p className="text-xs text-gray-400 capitalize mt-1">
                            {player.stats?.role || player.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {main ? (
              <button
                className="relative inline-block px-5 py-2 rounded-[30px] transition-transform duration-500 uppercase font-bold overflow-hidden border-none outline-none bg-theme-3 z-10 cursor-pointer before:z-[-1] before:content-[''] before:h-[200%] before:w-[200%] before:absolute before:top-full before:left-[-50%] before:right-0 before:bottom-0 before:rounded-full before:bg-theme before:transition-transform before:duration-500 hover:before:translate-y-[-2.7rem]"
                onClick={() => {
                  start();
                }}
              >
                Start
              </button>
            ) : (
              ""
            )}
            <button
              className="relative inline-block px-5 py-2 rounded-[30px] transition-transform duration-500 uppercase font-bold overflow-hidden border-none outline-none bg-theme-3 z-10 cursor-pointer before:z-[-1] before:content-[''] before:h-[200%] before:w-[200%] before:absolute before:top-full before:left-[-50%] before:right-0 before:bottom-0 before:rounded-full before:bg-theme before:transition-transform before:duration-500 hover:before:translate-y-[-2.7rem] mt-4"
              onClick={() => {
                exit();
              }}
            >
              Exit
            </button>
            {error ? (
              <div className="text-center block bg-red-500/10 text-base mt-3 p-2 rounded-2xl max-w-[22rem]">
                {error}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Lobby;
