import { createContext, useEffect, useState } from "react";
import Calendar from "./components/Calendar/Calendar";
import EventList from "./components/EventList/EventList";
import { useSelectDate } from "./hooks";

export const EventDateContext = createContext(null);
export const EventListContext = createContext(null);
export const EventModalContext = createContext(null);

function App() {
  const today = new Date();
  const { selectedDate, setSelectedDate } = useSelectDate(today.getFullYear(), today.getMonth(), today.getDate());
  let [eventList, setEventList] = useState([]);
  let [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (eventList.length !== 0) {
      window.localStorage.setItem("eventList", JSON.stringify(eventList));
    } else {
      if (window.localStorage.getItem("eventList")) {
        setEventList(JSON.parse(window.localStorage.getItem("eventList")));
      }
    }
  }, [eventList]);

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
        <EventListContext.Provider value={{ eventList, setEventList }}>
          <EventModalContext.Provider value={{ openModal, setOpenModal }}>
            <Calendar />
            <EventList />
          </EventModalContext.Provider>
        </EventListContext.Provider>
      </EventDateContext.Provider>
    </div>
  );
}

export default App;
