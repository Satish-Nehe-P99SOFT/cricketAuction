const Error = ({ text }) => {
  return (
    <div className="glassmorphism mt-40 w-full h-auto flex flex-col items-center justify-center text-xl font-semibold">
      <div className="p-0 m-0">
        <img
          alt="Indicates an error"
          className="p-0 m-0 w-80 h-80"
          src="Images/error.svg"
        />
      </div>
      <div className="p-8">{text}</div>
    </div>
  );
};

export default Error;
