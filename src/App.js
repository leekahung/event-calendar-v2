import { createContext } from "react";
import Calendar from "./components/Calendar/Calendar";
import EventList from "./components/EventList/EventList";
import { useSelectDate } from "./hooks";

export const EventDateContext = createContext(null);

function App() {
  const today = new Date();
  const { selectedDate, setSelectedDate } = useSelectDate(today.getFullYear(), today.getMonth(), today.getDate());

  const style = {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    gridGap: "50px",
    fontFamily: "Arial",
    fontSize: "16px",
    padding: "10px 30px",
  };

  return (
    <div style={style}>
      <EventDateContext.Provider value={{ selectedDate, setSelectedDate }}>
        <Calendar />
        <EventList />
      </EventDateContext.Provider>
    </div>
  );
}

export default App;
