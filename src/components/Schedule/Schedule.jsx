import "./styles.css";

export default function Schedule({ data, search }) {
  let final = [];
  search?.split(" ").forEach((item) => {
    const res = data.filter(
      (el) =>
        (el.team1.toLowerCase().includes(item.toLowerCase()) ||
          el.team2.toLowerCase().includes(item.toLowerCase())) &&
        !final.includes(el)
    );
    final.push(...res);
  });

  let toBeRendered = search && search.length > 0 ? final : data;

  return (
    <div className="matches">
      {toBeRendered?.map(({ id, date, team1, team2, winner }, index) => {
        return (
          <div key={id} className="tile">
            <div className="details">
              <span>
                T20 {index + 1} of {data.length}
              </span>
              <span>{team1}</span>
              <span>{team2}</span>
            </div>
            <div className="date">
              <span>{date}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
