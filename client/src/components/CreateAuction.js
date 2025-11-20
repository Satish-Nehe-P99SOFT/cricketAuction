import { v4 as uuidv4 } from "uuid";

const CreateAuction = ({
  socket,
  user,
  setCreated,
  setJoin,
  setRoom,
  setMain,
}) => {
  const newAuction = () => {
    const room = uuidv4();
    socket.emit("createAuction", {
      username: user.username,
      room,
    });
    setCreated(true);
    setRoom(room);
    setMain(true);
  };

  const joinAuction = () => {
    setJoin(true);
  };

  return (
    <div className="glassmorphism min-h-screen flex items-center justify-center text-2xl">
      <div className="glassmorphism border-t border-white/50 border-r-0 max-w-[25rem] h-auto px-12 py-8 rounded-[20px] flex flex-col">
        <button
          onClick={() => {
            newAuction();
          }}
          className="relative inline-block px-5 py-2 rounded-[30px] transition-transform duration-500 uppercase font-bold overflow-hidden border-none outline-none bg-theme-3 z-10 cursor-pointer before:z-[-1] before:content-[''] before:h-[200%] before:w-[200%] before:absolute before:top-full before:left-[-50%] before:right-0 before:bottom-0 before:rounded-full before:bg-theme before:transition-transform before:duration-500 hover:before:translate-y-[-2.7rem] my-6 mx-auto block"
        >
          Create Auction
        </button>
        <button
          onClick={() => {
            joinAuction();
          }}
          className="relative inline-block px-5 py-2 rounded-[30px] transition-transform duration-500 uppercase font-bold overflow-hidden border-none outline-none bg-theme-3 z-10 cursor-pointer before:z-[-1] before:content-[''] before:h-[200%] before:w-[200%] before:absolute before:top-full before:left-[-50%] before:right-0 before:bottom-0 before:rounded-full before:bg-theme before:transition-transform before:duration-500 hover:before:translate-y-[-2.7rem] my-6 mx-auto block"
        >
          Join Auction
        </button>
      </div>
    </div>
  );
};

export default CreateAuction;
