import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

const CreateAuction = ({
  socket,
  user,
  setCreated,
  setJoin,
  setView,
  setRoom,
  setMain,
}) => {
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    socket.on("create-success", (data) => {
      setCreated(true);
      setRoom(data.room);
      setMain(true);
      setError("");
    });

    socket.on("create-error", (data) => {
      setError(data.message);
    });

    return () => {
      socket.off("create-success");
      socket.off("create-error");
    };
  }, [socket, setCreated, setRoom, setMain]);

  const newAuction = () => {
    setError("");
    const room = uuidv4();
    socket.emit("createAuction", {
      username: user.username,
      room,
    });
  };

  const goToPlayers = () => {
    history.push("/players");
  };

  const joinAuction = () => {
    setJoin(true);
  };

  const viewAuction = () => {
    setView(true);
  };

  return (
    <div className="glassmorphism min-h-screen flex items-center justify-center text-2xl">
      <div className="glassmorphism border-t border-white/50 border-r-0 max-w-[25rem] h-auto px-12 py-8 rounded-[20px] flex flex-col">
        <button
          onClick={() => {
            newAuction();
          }}
          className="relative inline-block px-5 py-2 rounded-[30px] transition-transform duration-500 uppercase font-bold overflow-hidden border-none outline-none bg-theme-3 z-10 cursor-pointer before:z-[-1] before:content-[''] before:h-[200%] before:w-[200%] before:absolute before:top-full before:left-[-50%] before:right-0 before:bottom-0 before:rounded-full before:bg-theme before:transition-transform before:duration-500 hover:before:translate-y-[-2.7rem] my-6 mx-auto block"
        >
          Create Auction
        </button>
        {error && (
          <div className="text-center block bg-red-500/10 text-base mt-3 p-3 rounded-2xl max-w-[22rem] mx-auto">
            <p className="mb-2">{error}</p>
            {error.includes("add players") && (
              <button
                onClick={goToPlayers}
                className="relative inline-block px-4 py-2 rounded-[30px] transition-transform duration-500 uppercase font-bold overflow-hidden border-none outline-none bg-theme-3 z-10 cursor-pointer before:z-[-1] before:content-[''] before:h-[200%] before:w-[200%] before:absolute before:top-full before:left-[-50%] before:right-0 before:bottom-0 before:rounded-full before:bg-theme before:transition-transform before:duration-500 hover:before:translate-y-[-2.7rem] text-sm"
              >
                Go to Players Page
              </button>
            )}
          </div>
        )}
        <button
          onClick={() => {
            joinAuction();
          }}
          className="relative inline-block px-5 py-2 rounded-[30px] transition-transform duration-500 uppercase font-bold overflow-hidden border-none outline-none bg-theme-3 z-10 cursor-pointer before:z-[-1] before:content-[''] before:h-[200%] before:w-[200%] before:absolute before:top-full before:left-[-50%] before:right-0 before:bottom-0 before:rounded-full before:bg-theme before:transition-transform before:duration-500 hover:before:translate-y-[-2.7rem] my-6 mx-auto block"
        >
          Join Auction
        </button>
        <button
          onClick={() => {
            viewAuction();
          }}
          className="relative inline-block px-5 py-2 rounded-[30px] transition-transform duration-500 uppercase font-bold overflow-hidden border-none outline-none bg-theme-3 z-10 cursor-pointer before:z-[-1] before:content-[''] before:h-[200%] before:w-[200%] before:absolute before:top-full before:left-[-50%] before:right-0 before:bottom-0 before:rounded-full before:bg-theme before:transition-transform before:duration-500 hover:before:translate-y-[-2.7rem] my-6 mx-auto block"
        >
          View Auction
        </button>
      </div>
    </div>
  );
};

export default CreateAuction;
