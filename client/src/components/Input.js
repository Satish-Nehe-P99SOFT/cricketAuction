import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({ type, placeholder, onChange, icon, error, title }) => {
  return (
    <div className="py-6 relative">
      <label htmlFor={type} className="inline-block text-base px-4 my-2">
        {title}:{" "}
      </label>
      {icon ? (
        <FontAwesomeIcon
          icon={icon}
          className="absolute top-[4.9rem] left-4 scale-75 z-[999]"
        />
      ) : (
        ""
      )}
      <input
        id={type}
        className="glassmorphism py-1 w-full min-h-12 no-underline rounded-[35px] border-none outline-none pl-12 tracking-wide text-base text-font-main focus:border-2 focus:border-whitesmoke [&:-webkit-autofill]:shadow-[0_0_0_30px_hsla(267,15%,12%,0.247)_inset] [&:-webkit-autofill:hover]:shadow-[0_0_0_30px_hsla(267,15%,12%,0.247)_inset] [&:-webkit-autofill:focus]:shadow-[0_0_0_30px_hsla(267,15%,12%,0.247)_inset] [&:-webkit-autofill:active]:shadow-[0_0_0_30px_hsla(267,15%,12%,0.247)_inset]"
        placeholder={placeholder}
        type={type}
        onChange={(event) => onChange(event.target.value)}
      ></input>
      <p
        className={
          error === ""
            ? "hidden"
            : "text-center block bg-red-500/10 text-base mt-3 p-2 rounded-2xl max-w-[22rem]"
        }
      >
        {error}
      </p>
    </div>
  );
};

export default Input;
