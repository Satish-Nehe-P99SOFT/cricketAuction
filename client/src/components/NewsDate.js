const NewsDate = ({ weekDate, date }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pt-4 border-t border-white/10">
      <span className="text-text-muted text-sm md:text-base font-medium">
        {weekDate}
      </span>
      <span className="text-text-muted text-sm md:text-base">{date}</span>
    </div>
  );
};

export default NewsDate;
