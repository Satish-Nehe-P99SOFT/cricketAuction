const LoaderComponent = ({ size = 5 }) => {
  const dimensions = {
    width: size + "rem",
    height: size + "rem",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        style={dimensions}
        className="rounded-full border-[5px] border-font-main border-t-theme animate-spin"
      ></div>
    </div>
  );
};

export default LoaderComponent;
