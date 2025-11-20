const PlayerStats = ({ stats, role }) => {
  return (
    <div className="flex flex-wrap flex-row w-full h-auto">
      <div className="tracking-[1.5px] px-4 w-full">{role}:</div>
      {stats
        ? stats.map((stat, index) => {
            return (
              <div key={index} className="inline-block w-1/5 h-4 m-4">
                <span className="mr-2 border-l-2 border-hover pl-1">
                  {stat.label}:
                </span>
                <span className="text-theme-3">{stat.value}</span>
              </div>
            );
          })
        : "First Timer"}
    </div>
  );
};

export default PlayerStats;
