import NewsTitle from "./NewsTitle";
import NewsDescription from "./NewsDescription";
import NewsDate from "./NewsDate";

const NewsContent = ({ title, description, weekDate, date }) => {
  return (
    <div className="glassmorphism w-full h-full p-6 md:p-8 lg:p-10 flex flex-col justify-between space-y-6 hover:border-primary/30 transition-all duration-300">
      <div className="w-full h-full flex flex-col items-start justify-between space-y-6">
        <NewsTitle title={title} />
        <NewsDescription description={description} />
        <NewsDate weekDate={weekDate} date={date} />
      </div>
    </div>
  );
};

export default NewsContent;
