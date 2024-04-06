const express = require("express");
const cors = require("cors");
require("./db/config.js");
const watchList = require("./db/watchlist.js");
const User = require("./db/config");
const rules = require("./db/rules.js");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  if (req.body.password && req.body.email) {
    if (User.findOne(req.body.email)) {
      res.send({ result: "Email Already exist" });
    } else {
      let user = new User(req.body);
      let result = await user.save();
      result = result.toObject();
      delete result.password;
      res.send(result);
    }
  }
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "Please enter email and password" });
  }
});

//Watch list
app.get("/watchlist/:userID", async (req, res) => {
  console.log(req.params.userID);
  const userList = await watchList.find({ userID: req.params.userID });

  res.send(userList);
});

app.post("/watchlist/addStock", async (req, res) => {
  // console.log(req.body);
  const stock = watchList(req.body);
  let result = await stock.save();
  result = result.toObject();
  res.send(stock);
});

app.put("/watchlist/updateStock/:id", async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await watchList.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  // console.log(result);
  res.send(result);
});

app.delete("/watchlist/deleteStock/:id", async (req, res) => {
  const id = req.params.id;
  const result = await watchList.findByIdAndDelete(id);
  console.log(result);

  if (result) {
    res.send({ succes: "yes" });
  } else {
    res.send({ failure: "yes" });
  }
});

//rules
app.get("/rules/:userID", async (req, res) => {
  console.log(req.params.userID);
  const userRules = await rules.find({ userID: req.params.userID });

  res.send(userRules);
});

app.post("/rules/addRule", async (req, res) => {
  // console.log(req.body);
  const newRule = rules(req.body);
  let result = await newRule.save();
  result = result.toObject();
  res.send(result);
});

app.put("/rules/updateRule/:id", async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await rules.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  // console.log(result);
  res.send(result);
});

app.delete("/rules/deleteRule/:id", async (req, res) => {
  const id = req.params.id;
  const result = await rules.findByIdAndDelete(id);
  console.log(result);

  if (result) {
    res.send({ succes: "yes" });
  } else {
    res.send({ failure: "yes" });
  }
});

app.listen(5000);
