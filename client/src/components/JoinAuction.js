import Form from "./Form";
import { faKey, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const JoinAuction = ({
  socket,
  user,
  room,
  setRoom,
  errors,
  loading,
  setLoading,
}) => {
  const data = [
    {
      type: "text",
      title: "Room ID",
      placeholder: "Enter the auction room ID",
      onChange: (value) => {
        setRoom(value);
      },
      icon: faKey,
      error: errors.room,
    },
  ];

  const message = () => {
    return (
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl">
          <div className="flex items-start gap-3">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="text-primary text-lg mt-0.5 flex-shrink-0"
            />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-text-primary mb-2">
                How to Join an Auction
              </h4>
              <ul className="text-xs text-text-secondary space-y-1.5 list-disc list-inside">
                <li>Get the Room ID from the auction host</li>
                <li>Enter the Room ID in the field above</li>
                <li>Click &quot;Join Auction&quot; to enter the lobby</li>
                <li>Wait for the host to start the auction</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!room || room.trim() === "") {
      return;
    }
    setLoading(true);
    socket.emit("joinAuction", {
      username: user.username,
      room: room.trim(),
    });
    setLoading(false);
  };

  return (
    <div>
      <Form
        title="Join Auction"
        data={data}
        onFormSubmit={handleSubmit}
        message={message}
        error={errors.form}
        loading={loading}
      />
    </div>
  );
};

export default JoinAuction;
