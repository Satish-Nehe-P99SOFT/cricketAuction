import { useState, useEffect } from "react";
import { fetchAuctions } from "../services/auction.service";
import PlayerCard from "../components/PlayerCard";

const PreviousAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [clicked, setClicked] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchAuctions()
      .then((data) => {
        setAuctions(data.auctions);
        console.log(data.auctions);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const auctionClick = (index) => {
    setCurrent(index);
    setClicked(0);
  };

  const userClick = (index) => {
    setClicked(index);
  };

  return (
    <div className="glassmorphism min-h-screen flex flex-col items-center justify-start">
      {auctions.length > 0 ? (
        <div>
          <div className="flex gap-6 mt-8 justify-center">
            {auctions.map((a, index) => {
              return (
                <div
                  className={`text-theme-3 uppercase transition-all duration-500 ease-in-out origin-left text-2xl font-medium cursor-pointer bg-background-tertiary px-4 py-2 rounded-md border-b-2 ${
                    current === index ? "border-hover" : "border-transparent"
                  }`}
                  key={index}
                  onClick={() => auctionClick(index)}
                >
                  Auction {index + 1}
                </div>
              );
            })}
          </div>
          <div className="flex gap-6 mt-8 justify-center">
            {auctions[current].auction.map((u, index) => {
              return (
                <div
                  className={`text-theme-3 uppercase transition-all duration-500 ease-in-out origin-left text-2xl font-medium cursor-pointer bg-background-tertiary px-4 py-2 rounded-md border-b-2 ${
                    clicked === index ? "border-hover" : "border-transparent"
                  }`}
                  key={index}
                  onClick={() => userClick(index)}
                >
                  {u.user}
                </div>
              );
            })}
            {console.log(auctions[current])}
          </div>
          <div>
            {auctions[current].auction[clicked].batsmen
              ? auctions[current].auction[clicked].batsmen.map((b, index) => {
                  return <PlayerCard key={b.image} {...b} />;
                })
              : ""}
            {auctions[current].auction[clicked].wicketKeepers
              ? auctions[current].auction[clicked].wicketKeepers.map(
                  (w, index) => {
                    return <PlayerCard key={w.image} {...w} />;
                  }
                )
              : ""}
            {auctions[current].auction[clicked].allRounders
              ? auctions[current].auction[clicked].allRounders.map(
                  (w, index) => {
                    return <PlayerCard key={w.image} {...w} />;
                  }
                )
              : ""}
            {auctions[current].auction[clicked].bowlers
              ? auctions[current].auction[clicked].bowlers.map((w, index) => {
                  return <PlayerCard key={w.image} {...w} />;
                })
              : ""}
            {auctions[current].auction[clicked].unknown
              ? auctions[current].auction[clicked].unknown.map((w, index) => {
                  return <PlayerCard key={w.image} {...w} />;
                })
              : ""}
            {console.log(auctions[1].auction[0])}
          </div>
        </div>
      ) : (
        "NO DATA Available"
      )}
    </div>
  );
};

export default PreviousAuctions;
