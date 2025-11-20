import { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";
import UserAccordian from "./UserAccordian";
import { useHistory } from "react-router-dom";
const Game = ({ users, socket, room, user, initial }) => {
  const [timer, setTimer] = useState(-1);
  const [bidder, setBidder] = useState("");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(0);
  const [player, setPlayer] = useState(initial);
  const [displayNext, setNext] = useState(false);
  let history = useHistory();

  useEffect(() => {
    socket.emit("fetch-details");
    socket.on("server-details", (data) => {
      setBidder(data.bidder);
      setAmount(data.amount);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("display", (data) => {
      setTimer(data.time);
    });

    socket.on("bid", (data) => {
      setBidder(data.currentBidder.bidder);
      setAmount(data.currentBidder.bid);
    });

    socket.on("bid-error", (data) => {
      setError(data.message);
    });

    socket.on("player", (data) => {
      setPlayer(data.player);
    });

    socket.on("game-over", () => {
      history.push("/auctions/played");
    });
  }, [socket, history]);

  useEffect(() => {
    if (timer === 0) {
      setBidder("");
      setAmount(0);
      setNext(true);
    } else {
      setNext(false);
    }
  }, [timer]);

  const bid = () => {
    if (timer > 0) {
      socket.emit("bid", {
        room,
        user: user.username,
      });
    }
  };

  const next = () => {
    socket.emit("next", {
      room,
      user: user.username,
    });
    setNext(false);
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-center items-start gap-60 max-[650px]:flex-col max-[650px]:justify-center max-[650px]:items-center">
        {player ? <PlayerCard {...player} /> : ""}
        <div className="flex flex-col justify-start items-start h-auto gap-8">
          <div
            className={`text-[10rem] font-semibold transition-all duration-500 ease-in-out ${
              timer > 0 ? "animate-beat" : ""
            } ${
              timer < 7 && timer >= 4
                ? "text-yellow"
                : timer < 4
                ? "text-red"
                : ""
            }`}
          >
            {timer}
          </div>
          <div className="text-xl font-medium flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <p>Highest Bidder :</p>{" "}
                <p className="text-theme-3 font-semibold">{bidder}</p>
              </div>
              <div className="flex gap-2">
                <p>Bid Amount :</p>{" "}
                <p className="text-red font-semibold">{amount}cr</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              Budgets Remaining :
              {users.map((user, index) => {
                return (
                  <div className="flex gap-2" key={index}>
                    <p className="text-theme-3 font-semibold">{user.user}</p>{" "}
                    <p className="text-red font-semibold">{user.budget}cr</p>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-8">
              <button
                onClick={() => {
                  bid();
                }}
                className="relative inline-block px-5 py-2 rounded-[30px] transition-transform duration-500 uppercase font-bold overflow-hidden border-none outline-none bg-theme-3 z-10 cursor-pointer before:z-[-1] before:content-[''] before:h-[200%] before:w-[200%] before:absolute before:top-full before:left-[-50%] before:right-0 before:bottom-0 before:rounded-full before:bg-theme before:transition-transform before:duration-500 hover:before:translate-y-[-2.7rem]"
              >
                Bid
              </button>
              {displayNext ? (
                <button
                  onClick={() => {
                    next();
                  }}
                  className="relative inline-block px-5 py-2 rounded-[30px] transition-transform duration-500 uppercase font-bold overflow-hidden border-none outline-none bg-theme-3 z-10 cursor-pointer before:z-[-1] before:content-[''] before:h-[200%] before:w-[200%] before:absolute before:top-full before:left-[-50%] before:right-0 before:bottom-0 before:rounded-full before:bg-theme before:transition-transform before:duration-500 hover:before:translate-y-[-2.7rem]"
                >
                  Next
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly items-start">
        {users.map((user) => {
          return <UserAccordian key={user.user} {...user} />;
        })}
      </div>
      {error ? (
        <div className="text-center block bg-red-500/10 text-base mt-3 p-2 rounded-2xl max-w-[22rem]">
          {error}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Game;
