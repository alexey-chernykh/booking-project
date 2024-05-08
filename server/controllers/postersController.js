const fsPromises = require("fs/promises");
const path = require("path");
const postersDB = {
  posters: require("../model/posters.json"),
  setPosters: function (data) {
    this.posters = data;
  },
};

const getAllOrenda = async (req, res) => {
  await fsPromises
    .readFile("./model/posters.json")
    .then((data) => {
      res.status(200).json({
        message: JSON.parse(data).filter((o) => o.posterType == "orenda"),
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const getUserPosters = async (req, res) => {
  await fsPromises
    .readFile("./model/posters.json")
    .then((data) => {
      res.status(200).json({
        message: JSON.parse(data).filter((o) => o.user == req.params.user),
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const getAllProdaj = async (req, res) => {
  await fsPromises
    .readFile("./model/posters.json")
    .then((data) => {
      res.status(200).json({
        message: JSON.parse(data).filter((o) => o.posterType == "prodaj"),
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const addNewPoster = async (req, res) => {
  const newPoster = req.body.poster;
  newPoster.user = req.body.user;
  postersDB.setPosters([...postersDB.posters, newPoster]);
  try {
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "posters.json"),
      JSON.stringify(postersDB.posters)
    );
    res.status(201).json({ success: `New poster created!` });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

module.exports = { getAllOrenda, getAllProdaj, addNewPoster, getUserPosters };
