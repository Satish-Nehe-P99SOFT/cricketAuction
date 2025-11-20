const NewsTitle = ({ title }) => {
  return (
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      {title}
    </h2>
  );
};

export default NewsTitle;
