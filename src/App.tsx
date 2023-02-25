import React, { createContext, useEffect, useState, useReducer } from "react";
import { useMediaQuery } from "./hooks";
import Calendar from "./components/Calendar/Calendar";
import EventList from "./components/EventList/EventList";
import toggleReducer from "./reducers/toggleReducer";
import eventReducer from "./reducers/eventReducer";

const initialToggleState: IToggleReducerState = {
  openModal: false,
  openModalEdit: false,
  openEventList: false,
};
const initialEventDay: IEventReducerState = {
  eventYear: new Date().getFullYear(),
  eventMonth: new Date().getMonth(),
  eventDay: new Date().getDate(),
  eventId: 0,
};

type TCalenderEventContext = {
  eventList: ICalendarEventState[];
  setEventList: React.Dispatch<React.SetStateAction<ICalendarEventState[]>>;
};

export const EventListContext = createContext<TCalenderEventContext>({
  eventList: [],
  setEventList: () => {},
});
export const ToggleContext = createContext<{
  toggleState: IToggleReducerState;
  toggleDispatch: React.Dispatch<IToggleReducerAction>;
}>({
  toggleState: initialToggleState,
  toggleDispatch: () => undefined,
});
export const EventDayContext = createContext<{
  eventDayState: IEventReducerState;
  eventDayDispatch: React.Dispatch<IEventReducerAction>;
}>({
  eventDayState: initialEventDay,
  eventDayDispatch: () => undefined,
});

function App() {
  let [eventList, setEventList] = useState<ICalendarEventState[]>([]);
  const [toggleState, toggleDispatch] = useReducer(
    toggleReducer,
    initialToggleState
  );
  const [eventDayState, eventDayDispatch] = useReducer(
    eventReducer,
    initialEventDay
  );

  useEffect(() => {
    if (eventList?.length !== 0) {
      window.localStorage.setItem("eventList", JSON.stringify(eventList));
    } else {
      const localEventList = window.localStorage.getItem("eventList");
      if (localEventList) {
        setEventList(JSON.parse(localEventList));
      }
    }
  }, [eventList]);

  const query1200 = useMediaQuery("(min-width: 1200px)");
  const query900 = useMediaQuery("(min-width: 900px)");

  const style: React.CSSProperties = {
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
            <EventList />
            <Calendar query1200={query1200} />
          </EventListContext.Provider>
        </ToggleContext.Provider>
      </EventDayContext.Provider>
    </div>
  );
}

export default App;
