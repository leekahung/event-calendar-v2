import Calendar from "./components/Calendar/Calendar";

function App() {
  const style = {
    fontFamily: "Arial",
    fontSize: "16px",
    padding: "10px",
  };

  return (
    <div style={style}>
      <Calendar />
    </div>
  );
}

export default App;
