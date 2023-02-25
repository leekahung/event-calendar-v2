interface IToggleReducerState {
  openModal: boolean;
  openModalEdit: boolean;
  openEventList: boolean;
}

interface IToggleReducerAction {
  type: string;
}

interface IEventReducerState {
  eventYear: number;
  eventMonth: number;
  eventDay: number;
  eventId: number;
}

interface IEventReducerAction {
  type: string;
  payload: number;
}

interface ICalendarEventState {
  date?: Date;
  name: string;
  description: string;
  id?: number;
}

interface IEventListStyle1200 {
  visibility: Visibility;
  position: Position;
  height: string;
  width: string;
}

interface IEventListStyle900 {
  visibility: Visibility;
  height: string;
  width: string;
  bottom: string;
}

interface eventListStyle {
  visibility?: Visiblity;
  height?: string;
  width?: string;
  bottom?: string;
  position?: Position;
  display: string;
  alignItems: string;
  flexDirection: FlexDirection;
  backgroundColor: string;
  zIndex: string;
  overflowY: OverFlowY;
}
