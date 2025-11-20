import AccordianComponent from "./AccordianComponent";
import { useState } from "react";
const UserAccordian = ({
  user,
  batsmen,
  wicketKeepers,
  allRounders,
  bowlers,
  unknown,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={`transition-all duration-500 ease-in-out px-4 h-7 glassmorphism bg-background-tertiary mb-4 border-none rounded-md ${
        show ? "h-auto" : ""
      }`}
    >
      <div className="flex justify-between items-center text-xl gap-2">
        {user}
        <img
          src="/Images/arrow.svg"
          alt="an-arrow"
          className={`w-6 mb-[-0.1rem] cursor-pointer transition-all duration-500 ease-in-out ${
            show ? "rotate-90" : "-rotate-90"
          }`}
          onClick={() => setShow((prev) => !prev)}
        ></img>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out origin-top border-none ${
          show ? "scale-y-100" : "scale-y-0"
        }`}
      >
        {batsmen.length > 0 ? (
          <AccordianComponent title="Batsmen" players={batsmen} />
        ) : (
          ""
        )}
        {wicketKeepers.length > 0 ? (
          <AccordianComponent title="Wicket Keepers" players={wicketKeepers} />
        ) : (
          ""
        )}
        {allRounders.length > 0 ? (
          <AccordianComponent title="All Rounders" players={allRounders} />
        ) : (
          ""
        )}
        {bowlers.length > 0 ? (
          <AccordianComponent title="Bowlers" players={bowlers} />
        ) : (
          ""
        )}
        {unknown.length > 0 ? (
          <AccordianComponent title="Unknown" players={unknown} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UserAccordian;
