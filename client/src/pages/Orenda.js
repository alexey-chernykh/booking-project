import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Card from "../components/Card";

export default function Orenda() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/orenda")
      .then((response) => response.json())
      .then((response) => setData(response.message));
  }, []);

  return (
    <>
      <Header text="Оренда"></Header>
      <div>
        {!data
          ? "Loading..."
          : data.map((o, key) => {
              return (
                <div key={key}>
                  <Card
                    price={o.price}
                    address={o.address}
                    description={o.description}
                    roomCount={o.roomCount}
                  />
                </div>
              );
            })}
      </div>
    </>
  );
}
