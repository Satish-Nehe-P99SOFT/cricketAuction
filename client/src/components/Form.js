import Input from "./Input";
import Loader from "./Loading.component";

/*
Elements passed to form:

1) Title of the form
2) An array, where every element contains => type, placeholder, onChange, icon, error.
3) An additional message function, could be null.
4) onFormSubmit function
5) error 
6) loading

*/

const Form = ({
  title,
  data,
  onFormSubmit,
  message = () => {},
  error,
  loading,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Static background with subtle pattern */}
      <div className="absolute inset-0 bg-background-secondary">
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-background-secondary to-slate-800/50"></div>
      </div>

      <div className="relative z-10 glassmorphism max-w-xl w-full px-10 py-12 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl">
        {/* Modern heading with gradient */}
        <div className="text-center mb-8">
          <h3 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {title}
            </span>
          </h3>
          <div className="h-1 w-20 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full mt-3"></div>
        </div>

        <form
          id="form"
          onSubmit={onFormSubmit}
          noValidate
          className="space-y-6"
        >
          {data.map((inputFields, index) => {
            return <Input key={index} {...inputFields} />;
          })}

          {!loading ? (
            <div className="center mt-8">
              <button
                type="submit"
                className="relative inline-block px-8 py-3 rounded-xl transition-all duration-300 uppercase font-bold overflow-hidden border-none outline-none bg-gradient-to-r from-primary via-secondary to-accent text-white z-10 cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                <span className="relative z-10">{title}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-secondary to-accent-hover opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          ) : (
            <div className="center mt-8">
              <Loader size="2" />
            </div>
          )}
        </form>

        {/* Error message with modern styling */}
        {error && (
          <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
            <p className="text-center text-red-400 text-sm font-medium">
              {error}
            </p>
          </div>
        )}

        {/* Message section */}
        <div className="mt-6">{message()}</div>
      </div>
    </div>
  );
};

export default Form;
