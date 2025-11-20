const AccordianComponent = ({ title, players }) => {
  return (
    <div className="flex flex-col">
      <div className="font-medium uppercase text-hover mt-4 mb-2">{title}:</div>
      <div>
        {players.map((player, index) => {
          return <div key={index}>{player.name}</div>;
        })}
      </div>
    </div>
  );
};

export default AccordianComponent;
