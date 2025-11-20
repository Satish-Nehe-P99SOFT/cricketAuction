const NewsDescription = ({ description }) => {
  return (
    <p className="text-text-secondary text-base md:text-lg leading-relaxed flex-1">
      {description}
    </p>
  );
};

export default NewsDescription;
