import { useMediaQuery } from "../../../hooks";

const Weekday = ({ index, weekday }) => {
  const query900 = useMediaQuery("(min-width: 900px)");
  const query600 = useMediaQuery("(min-width: 600px)");

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: index % 6 === 0 ? "rgb(240, 240, 240)" : "white",
    padding: query600 ? "10px" : "",
    fontSize: query900 ? "16px" : "14px",
  };

  return <div style={style}>{weekday}</div>;
};

export default Weekday;
