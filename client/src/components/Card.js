import "./Card.css";
import Label from "./Label";

export default function Card(props) {
  return (
    <>
      <div className="card">
        <Label
          text={props.posterType ? "Тип оголошення: " + props.posterType : ""}
        ></Label>
        <Label text={"Ціна: " + props.price + " грн"}></Label>
        <Label text={"Адрес: " + props.address}></Label>
        <Label text={"Опис: " + props.description}></Label>
        <Label text={"Кількість кімнат: " + props.roomCount}></Label>
      </div>
    </>
  );
}
