import { createContext, useEffect, useState, useReducer } from "react";
import Calendar from "./components/Calendar/Calendar";
import EventList from "./components/EventList/EventList";
import { useMediaQuery } from "./hooks";

export const EventListContext = createContext(null);
export const ToggleContext = createContext(null);
export const EventDayContext = createContext(null);

const toggleReducer = (state, action) => {
  switch (action.type) {
    case "openModal":
      return { ...state, openModal: true };
    case "openModalEdit":
      return { ...state, openModalEdit: true };
    case "openEventList":
      return { ...state, openEventList: true };
    case "closeModal":
      return { ...state, openModal: false };
    case "closeModalEdit":
      return { ...state, openModalEdit: false };
    case "closeEventList":
      return { ...state, openEventList: false };
    default:
      return state;
  }
};

const eventReducer = (state, action) => {
  switch (action.type) {
    case "setEventYear":
      return { ...state, eventYear: action.payload };
    case "setEventMonth":
      return { ...state, eventMonth: action.payload };
    case "setEventDay":
      return { ...state, eventDay: action.payload };
    case "setEventId":
      return { ...state, eventId: action.payload };
    default:
      return state;
  }
};

function App() {
  const initialToggleState = {
    openModal: false,
    openModalEdit: false,
    openEventList: false,
  };
  const initialEventDay = {
    eventYear: new Date().getFullYear(),
    eventMonth: new Date().getMonth(),
    eventDay: new Date().getDate(),
    eventId: 0,
  };
  let [eventList, setEventList] = useState([]);
  const [toggleState, toggleDispatch] = useReducer(
    toggleReducer,
    initialToggleState
  );
  const [eventDayState, eventDayDispatch] = useReducer(
    eventReducer,
    initialEventDay
  );

  useEffect(() => {
    if (eventList.length !== 0) {
      window.localStorage.setItem("eventList", JSON.stringify(eventList));
    } else {
      if (window.localStorage.getItem("eventList")) {
        setEventList(JSON.parse(window.localStorage.getItem("eventList")));
      }
    }
  }, [eventList]);

  const query1200 = useMediaQuery("(min-width: 1200px)");
  const query900 = useMediaQuery("(min-width: 900px)");

  const style = {
    display: "grid",
    gridTemplateColumns: query1200 ? "1fr 3fr" : "1fr",
    gridTemplateRows: query900 ? "" : "1fr 1fr",
    fontFamily: "Arial",
    fontSize: "16px",
    position: "relative",
    width: "100%",
    height: "100vh",
  };

  return (
    <div style={style}>
      <EventDayContext.Provider value={{ eventDayState, eventDayDispatch }}>
        <ToggleContext.Provider value={{ toggleState, toggleDispatch }}>
          <EventListContext.Provider value={{ eventList, setEventList }}>
            {query1200 ? (
              <EventList />
            ) : query900 ? (
              toggleState.openEventList ? (
                <EventList />
              ) : null
            ) : (
              <EventList />
            )}
            <Calendar query1200={query1200} />
          </EventListContext.Provider>
        </ToggleContext.Provider>
      </EventDayContext.Provider>
    </div>
  );
}

export default App;
