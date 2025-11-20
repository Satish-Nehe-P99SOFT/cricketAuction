const NewsImage = ({ image }) => {
  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className="w-full h-full min-h-[20rem] md:min-h-[28rem] rounded-xl overflow-hidden bg-cover bg-center shadow-2xl ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300 hover:scale-[1.02] group"
    >
      <div className="w-full h-full bg-gradient-to-t from-background-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default NewsImage;
