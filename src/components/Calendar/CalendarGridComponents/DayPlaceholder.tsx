interface Props {
  index: number;
}

const DayPlaceholder = ({ index }: Props) => {
  const style = {
    backgroundColor:
      index % 7 === 0 || index % 7 === 6 ? "rgb(240, 240, 240)" : "white",
  };

  return <div style={style} />;
};

export default DayPlaceholder;
