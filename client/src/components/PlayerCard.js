import PlayerStats from "./PlayerStats";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PlayerCard = ({ image, name, squad, stats }) => {
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

  return (
    <div className="p-1 w-[21rem] h-auto mt-4 glassmorphism border-none bg-background-tertiary">
      <div className="bg-transparent relative w-full flex gap-4 flex-col justify-center items-center text-center before:absolute before:content-[''] before:w-1/2 before:h-[1.5%] before:top-[102%] before:left-[25.5%] before:right-0 before:bottom-0 before:bg-theme">
        <img src={image} alt="player profile"></img>
        <h2 className="block m-0">{name}</h2>
      </div>

      <div className="p-1">
        <div className="text-center text-hover capitalize tracking-[1.5px] m-4">
          {stats.role}
        </div>
        {stats.batting && stats.bowling ? (
          <div className="w-auto">
            <Slider {...settings}>
              <PlayerStats stats={stats.batting} role="Batting" />
              <PlayerStats stats={stats.bowling} role="Bowling" />
            </Slider>
          </div>
        ) : stats.batting ? (
          <PlayerStats stats={stats.batting} role="Batting" />
        ) : (
          <PlayerStats stats={stats.bowling} role="Bowling" />
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
