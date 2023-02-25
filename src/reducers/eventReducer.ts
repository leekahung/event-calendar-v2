const eventReducer = (
  state: IEventReducerState,
  action: IEventReducerAction
): IEventReducerState => {
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

export default eventReducer;
