import { createContext } from "react";

export const initialToggleState: IToggleReducerState = {
  openModal: false,
  openModalEdit: false,
  openEventList: false,
};

export const initialEventDay: IEventReducerState = {
  eventYear: new Date().getFullYear(),
  eventMonth: new Date().getMonth(),
  eventDay: new Date().getDate(),
  eventId: 0,
};

type TCalenderEventContext = {
  eventList: ICalendarEventState[];
  setEventList: React.Dispatch<React.SetStateAction<ICalendarEventState[]>>;
};

type TToggleReducerContext = {
  toggleState: IToggleReducerState;
  toggleDispatch: React.Dispatch<IToggleReducerAction>;
};

type TEventDayContext = {
  eventDayState: IEventReducerState;
  eventDayDispatch: React.Dispatch<IEventReducerAction>;
};

export const EventListContext = createContext<TCalenderEventContext>({
  eventList: [],
  setEventList: () => {},
});

export const ToggleContext = createContext<TToggleReducerContext>({
  toggleState: initialToggleState,
  toggleDispatch: () => undefined,
});

export const EventDayContext = createContext<TEventDayContext>({
  eventDayState: initialEventDay,
  eventDayDispatch: () => undefined,
});
