const Bars = (props) => {
  const { barState, setBarState } = props;
  return (
    <button
      className="md:hidden flex flex-col justify-center items-center w-10 h-10 cursor-pointer z-30 transition-all duration-300"
      onClick={() => {
        setBarState((prev) => !prev);
      }}
      aria-label="Toggle menu"
    >
      <span
        className={`block w-6 h-0.5 rounded-full bg-text-primary transition-all duration-300 ease-in-out mb-1.5 ${
          barState ? "rotate-45 translate-y-2" : ""
        }`}
      ></span>
      <span
        className={`block w-6 h-0.5 rounded-full bg-text-primary transition-all duration-300 ease-in-out mb-1.5 ${
          barState ? "opacity-0 -translate-x-4" : ""
        }`}
      ></span>
      <span
        className={`block w-6 h-0.5 rounded-full bg-text-primary transition-all duration-300 ease-in-out ${
          barState ? "-rotate-45 -translate-y-2" : ""
        }`}
      ></span>
    </button>
  );
};

export default Bars;
