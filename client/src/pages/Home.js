import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Label from "../components/Label";
import "./Home.css";
export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((response) => setData(response.message));
  }, []);

  return (
    <>
      <section className="homepageSection">
        <Header text={!data ? "Loading..." : data.naming}></Header>
        <Label text={!data ? "" : data.description}></Label>
      </section>
      <img
        className="homepageImage"
        src={process.env.PUBLIC_URL + "/img/luxury-house.jpg"}
        alt="Розкішний будинок з чудовим краєвидом"
      />
      <section className="homepageSection">
        <Header text="Особливості нашого сайту:"></Header>
        <ol>
          <li>
            <Label text="Широкий вибір нерухомості"></Label>
          </li>
          <li>
            <Label text="Зручний пошук"></Label>
          </li>
          <li>
            <Label text="Детальні описи"></Label>
          </li>
          <li>
            <Label text="Рекомендації та відгуки"></Label>
          </li>
          <li>
            {" "}
            <Label text="Підписка на оновлення"></Label>
          </li>
        </ol>
      </section>
    </>
  );
}
