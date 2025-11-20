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
    <div className="glassmorphism min-h-screen flex items-center justify-center text-2xl">
      <div className="glassmorphism border-t border-white/50 border-r-0 max-w-[25rem] h-auto px-12 py-8 rounded-[20px]">
        <h3 className="text-center">{title}</h3>
        <form id="form" onSubmit={onFormSubmit} noValidate>
          {data.map((inputFields, index) => {
            return <Input key={index} {...inputFields} />;
          })}
          {!loading ? (
            <div className="center">
              {" "}
              <button
                type="submit"
                className="relative inline-block px-5 py-2 rounded-[30px] transition-transform duration-500 uppercase font-bold overflow-hidden border-none outline-none bg-theme-3 z-10 cursor-pointer before:z-[-1] before:content-[''] before:h-[200%] before:w-[200%] before:absolute before:top-full before:left-[-50%] before:right-0 before:bottom-0 before:rounded-full before:bg-theme before:transition-transform before:duration-500 hover:before:translate-y-[-2.7rem]"
              >
                {title}
              </button>{" "}
            </div>
          ) : (
            <Loader size="2" />
          )}
        </form>
        <p
          className={
            error === ""
              ? "hidden"
              : "text-center block bg-red-500/10 text-base mt-3 p-2 rounded-2xl max-w-[22rem]"
          }
        >
          {error}
        </p>
        <div className="flex justify-center items-center flex-col mt-4">
          {message()}
        </div>
      </div>
    </div>
  );
};

export default Form;
