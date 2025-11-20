import NewsImage from "./NewsImage";
import NewsContent from "./NewsContent";

const NewsCard = ({ image, ...remaining }) => {
  return (
    <div className="mx-auto justify-center grid grid-cols-1 md:grid-cols-[35%_65%] w-full min-h-[28rem] md:min-h-[32rem] gap-4 md:gap-6 p-4 md:p-6 lg:p-8 animate-scale-in">
      <div className="order-2 md:order-1">
        <NewsImage image={image} />
      </div>
      <div className="order-1 md:order-2">
        <NewsContent {...remaining} />
      </div>
    </div>
  );
};

export default NewsCard;
