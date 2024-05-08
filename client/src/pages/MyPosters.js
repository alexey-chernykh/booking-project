import React, { useRef, useState, useEffect } from "react";
import axios from "../axios";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Card from "../components/Card";
import "./MyPosters.css";
export default function MyPosters() {
  const { auth, setAuth } = useAuth();
  const [poster, setPoster] = useState({});
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/myposters/" + auth.user)
      .then((response) => response.json())
      .then((response) => setData(response.message));
  }, []);

  const handleNewPoster = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/myposters",
        JSON.stringify({ poster, user: auth.user }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header text="Мої оголошення"></Header>
      <div>
        {!data
          ? "Loading..."
          : data.map((o, key) => {
              return (
                <div key={key}>
                  <Card
                    posterType={o.posterType}
                    price={o.price}
                    address={o.address}
                    description={o.description}
                    roomCount={o.roomCount}
                  />
                </div>
              );
            })}
      </div>
      <section className="myPostersSection">
        <form onSubmit={handleNewPoster}>
          <label htmlFor="postertype">posterType:</label>
          <input
            type="text"
            id="postertype"
            onChange={(e) =>
              setPoster({
                posterType: e.target.value,
                price: poster.price,
                address: poster.address,
                description: poster.description,
                roomCount: poster.roomCount,
              })
            }
            required
          />
          <label htmlFor="price">price:</label>
          <input
            type="text"
            id="price"
            onChange={(e) =>
              setPoster({
                posterType: poster.posterType,
                price: e.target.value,
                address: poster.address,
                description: poster.description,
                roomCount: poster.roomCount,
              })
            }
            required
          />
          <label htmlFor="address">address:</label>
          <input
            type="text"
            id="address"
            onChange={(e) =>
              setPoster({
                posterType: poster.posterType,
                price: poster.price,
                address: e.target.value,
                description: poster.description,
                roomCount: poster.roomCount,
              })
            }
            required
          />
          <label htmlFor="description">description:</label>
          <input
            type="text"
            id="description"
            onChange={(e) =>
              setPoster({
                posterType: poster.posterType,
                price: poster.price,
                address: poster.address,
                description: e.target.value,
                roomCount: poster.roomCount,
              })
            }
            required
          />
          <label htmlFor="roomcount">roomCount:</label>
          <input
            type="text"
            id="roomcount"
            onChange={(e) =>
              setPoster({
                posterType: poster.posterType,
                price: poster.price,
                address: poster.address,
                description: poster.description,
                roomCount: e.target.value,
              })
            }
            required
          />
          <button>Apply</button>
        </form>
      </section>
    </>
  );
}
