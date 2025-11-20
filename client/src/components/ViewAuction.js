import Form from "./Form";

const ViewAuction = ({
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
      type: "room",
      title: "Room Id",
      placeholder: "Enter the auction room id",
      onChange: (value) => {
        setRoom(value);
      },
      icon: "",
      error: errors.room,
    },
  ];

  const message = () => {
    return (
      <p className="text-sm text-gray-400 italic mt-2 text-center">
        You will be able to view the auction but cannot bid.
      </p>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    socket.emit("viewAuction", {
      username: user.username,
      room,
    });
    setLoading(false);
  };

  return (
    <div>
      <Form
        title="View Auction"
        data={data}
        onFormSubmit={handleSubmit}
        message={message}
        error={errors.form}
        loading={loading}
      />
    </div>
  );
};

export default ViewAuction;
