const fsPromises = require("fs/promises");
const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
  setUser: function (username, firstname, lastname) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username == username) {
        this.users[i].firstname = firstname;
        this.users[i].lastname = lastname;
      }
    }
  },
};
const getAllUsers = async (req, res) => {
  await fsPromises
    .readFile("./model/users.json")
    .then((data) => {
      res.status(200).json(JSON.parse(data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const getSpecificUser = async (req, res) => {
  await fsPromises
    .readFile("./model/users.json")
    .then((data) => {
      res
        .status(200)
        .json(JSON.parse(data).find((u) => u.username === req.params.user));
      console.log(JSON.parse(data).find((u) => u.username === req.params.user));
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateUser = async (req, res) => {
  usersDB.setUser(req.params.user, req.body.firstName, req.body.lastName);
  console.log(usersDB.users);
  await fsPromises.writeFile(
    "./model/users.json",
    JSON.stringify(usersDB.users)
  );
  res.json({ firstname: req.body.firstName, lastname: req.body.lastName });
};

module.exports = { getAllUsers, getSpecificUser, updateUser };
