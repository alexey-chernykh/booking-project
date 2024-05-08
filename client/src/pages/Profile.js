import React, { useRef, useState, useEffect } from "react";
import Button from "../components/Button";
import Label from "../components/Label";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import axios from "../axios";
import "./Profile.css";

export default function Profile() {
  const { auth, setAuth } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const [firstName, setFirstName] = useState(auth.firstname);
  const [lastName, setLastName] = useState(auth.lastname);

  const setShowEditMethod = () => {
    setShowEdit(!showEdit);
  };

  const updateLabels = (fn, ln) => {
    axios
      .get("/users/" + auth.user)
      .then((res) => {
        setAuth({
          user: auth.user,
          firstname: fn,
          lastname: ln,
          pwd: auth.pwd,
          accessToken: auth.accessToken,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/users/" + auth.user,
        JSON.stringify({ firstName, lastName }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      updateLabels(response.data.firstname, response.data.lastname);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header text="Ваш профіль"></Header>
      <Label
        text={"Ім'я: " + (!auth.firstname ? "Не визначено" : auth.firstname)}
      ></Label>
      <Label
        text={"Прізвище: " + (!auth.lastname ? "Не визначено" : auth.lastname)}
      ></Label>
      <Label text={"Ім'я користувача: " + auth.user}></Label>

      <Button text="Змінити дані" onClick={setShowEditMethod}></Button>
      <section className="editUserSection">
        {showEdit ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstname">firstname:</label>
            <input
              type="text"
              id="firstname"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />
            <label htmlFor="lastname">lastname:</label>
            <input
              type="text"
              id="lastname"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
            <button>Apply</button>
          </form>
        ) : (
          <></>
        )}
      </section>
    </>
  );
}
