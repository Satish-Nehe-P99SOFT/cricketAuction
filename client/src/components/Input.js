import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({ type, placeholder, onChange, icon, error, title }) => {
  return (
    <div className="relative mb-6">
      {/* Modern label styling */}
      <label
        htmlFor={type}
        className="block text-sm font-semibold text-text-secondary mb-2 px-1 tracking-wide uppercase"
      >
        {title}
      </label>

      {/* Input container with icon */}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <FontAwesomeIcon icon={icon} className="text-text-muted text-lg" />
          </div>
        )}

        <input
          id={type}
          className={`
            w-full px-4 py-3.5 rounded-xl
            bg-background-tertiary/50 border border-white/10
            text-text-primary text-base
            placeholder:text-text-muted/60
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
            hover:border-white/20
            ${icon ? "pl-12" : "pl-4"}
            ${
              error
                ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/50"
                : ""
            }
            [&:-webkit-autofill]:!bg-background-tertiary/50
            [&:-webkit-autofill]:!text-text-primary
            [&:-webkit-autofill]:!border-primary/50
            [&:-webkit-autofill]:shadow-[0_0_0_30px_rgba(30,41,59,0.5)_inset]
          `}
          placeholder={placeholder}
          type={type}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>

      {/* Error message with modern styling */}
      {error && (
        <div className="mt-2 px-2">
          <p className="text-sm text-red-400 font-medium flex items-center gap-1">
            <span>⚠</span>
            <span>{error}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Input;
