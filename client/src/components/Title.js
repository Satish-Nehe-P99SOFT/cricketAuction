const Title = ({ title, fadeAnimation }) => {
  return (
    <div
      className={`inline-block uppercase font-bold text-4xl md:text-6xl lg:text-7xl px-4 md:px-8 mx-auto tracking-wider ${
        fadeAnimation === "left" ? "animate-dash-left" : "animate-dash-right"
      }`}
    >
      <h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-lg hover:scale-105 transition-transform duration-300">
        {title}
      </h1>
    </div>
  );
};

export default Title;
