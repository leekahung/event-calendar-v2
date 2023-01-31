import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const clearValue = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    clearValue,
  };
};

export const useSelectDate = (year, month, day) => {
  const [selectYear, setSelectYear] = useState(year);
  const [selectMonth, setSelectMonth] = useState(month);
  const [selectDay, setSelectDay] = useState(day);

  const setSelectedDate = (selectedYear, selectedMonth, selectedDay) => {
    setSelectYear(selectedYear);
    setSelectDay(selectedDay);
    setSelectMonth(selectedMonth);
  };

  const selectedDate = {
    year: selectYear,
    month: selectMonth,
    day: selectDay,
  };

  return { setSelectedDate, selectedDate };
};
