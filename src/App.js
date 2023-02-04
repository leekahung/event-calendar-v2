import { createContext, useEffect, useState } from "react";
import Calendar from "./components/Calendar/Calendar";
import EventList from "./components/EventList/EventList";
import { useMediaQuery, useSelectDate } from "./hooks";

export const EventDateContext = createContext(null);
export const EventListContext = createContext(null);
export const EventModalContext = createContext(null);
export const EventEditModalContext = createContext(null);
export const EventIdContext = createContext(null);

function App() {
  const today = new Date();
  const { selectedDate, setSelectedDate } = useSelectDate(today.getFullYear(), today.getMonth(), today.getDate());
  let [eventList, setEventList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [eventId, setEventId] = useState(0);
  const [openEventList, setOpenEventList] = useState(false);

  useEffect(() => {
    if (eventList.length !== 0) {
      window.localStorage.setItem("eventList", JSON.stringify(eventList));
    } else {
      if (window.localStorage.getItem("eventList")) {
        setEventList(JSON.parse(window.localStorage.getItem("eventList")));
      }
    }
  }, [eventList]);

  const handleOpenEventList = () => {
    setOpenEventList(!openEventList);
  };

  const query1200 = useMediaQuery("(min-width: 1200px)");

  const style = {
    display: "grid",
    gridTemplateColumns: query1200 ? "3fr 1fr" : "1fr",
    fontFamily: "Arial",
    fontSize: "16px",
    position: "relative",
    height: "100dvh",
    width: "100dvw",
  };

  const eventListStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: query1200 ? "white" : "rgba(255, 255, 255, 0.9)",
    position: query1200 ? "" : "absolute",
    top: query1200 ? "" : "0",
    height: query1200 ? "" : "100%",
    width: query1200 ? "" : "40%",
    transform: query1200 ? "" : openEventList ? "translateX(0)" : "translateX(-40vw)",
  };

  return (
    <div style={style}>
      <EventDateContext.Provider value={{ selectedDate, setSelectedDate }}>
        <EventListContext.Provider value={{ eventList, setEventList }}>
          <EventModalContext.Provider value={{ openModal, setOpenModal }}>
            <EventEditModalContext.Provider value={{ openModalEdit, setOpenModalEdit }}>
              <EventIdContext.Provider value={{ eventId, setEventId }}>
                <Calendar query1200={query1200} handleOpenEventList={handleOpenEventList} />
                {query1200 ? (
                  <EventList style={eventListStyle} />
                ) : openEventList ? (
                  <EventList style={eventListStyle} handleOpenEventList={handleOpenEventList} />
                ) : null}
              </EventIdContext.Provider>
            </EventEditModalContext.Provider>
          </EventModalContext.Provider>
        </EventListContext.Provider>
      </EventDateContext.Provider>
    </div>
  );
}

export default App;
