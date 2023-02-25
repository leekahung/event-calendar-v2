const toggleReducer = (
  state: IToggleReducerState,
  action: IToggleReducerAction
): IToggleReducerState => {
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

export default toggleReducer;
