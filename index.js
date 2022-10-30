const express = require("express");
const app = express();
var path = require("path");
const { auth } = require("express-openid-connect");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "https://web2-lab1-scdr.onrender.com",
  clientID: "ZhzELJPc1pFrkq6zPO5q9QFaRx5K2i4f",
  issuerBaseURL: "https://dev-8bryt21l5v4frhip.us.auth0.com",
};
app.use(auth(config));

let data = {
  teams: [
    {
      name: "Rijeka",
      mp: 0,
      w: 0,
      d: 0,
      l: 0,
      f: 0,
      a: 0,
      gd: 0,
      pts: 0,
    },
    {
      name: "Dinamo",
      mp: 0,
      w: 0,
      d: 0,
      l: 0,
      f: 0,
      a: 0,
      gd: 0,
      pts: 0,
    },
    {
      name: "Hajduk",
      mp: 0,
      w: 0,
      d: 0,
      l: 0,
      f: 0,
      a: 0,
      gd: 0,
      pts: 0,
    },
    {
      name: "Osijek",
      mp: 0,
      w: 0,
      d: 0,
      l: 0,
      f: 0,
      a: 0,
      gd: 0,
      pts: 0,
    },
  ],
  matchweeks: [
    {
      games: [
        {
          team1: "Rijeka",
          score1: 0,
          score2: 2,
          team2: "Dinamo",
        },
        {
          team1: "Hajduk",
          score1: 3,
          score2: 1,
          team2: "Osijek",
        },
      ],
      comments: [
        {
          username: "Zvonimir Kristo",
          content: "Super utakmica!",
        },
      ],
    },
    {
      games: [
        {
          team1: "Rijeka",
          score1: 0,
          score2: 2,
          team2: "Hajduk",
        },
        {
          team1: "Dinamo",
          score1: 2,
          score2: 1,
          team2: "Osijek",
        },
      ],
      comments: [],
    },
    {
      games: [
        {
          team1: "Rijeka",
          score1: 0,
          score2: 2,
          team2: "Osijek",
        },
        {
          team1: "Dinamo",
          score1: 2,
          score2: 1,
          team2: "Hajduk",
        },
      ],
      comments: [],
    },
  ],
};

data.matchweeks.forEach((match) => {
  match.games.forEach((game) => {
    console.log(game);
    if (game.score1 > game.score2) {
      data.teams.forEach((team) => {});
    } else if (game.score1 < game.score2) {
    } else {
    }
  });
});

app.get("/", (req, res) => {
  res.render("home", {
    req: req,
    data: data,
  });
});

app.post("/post", (req, res) => {
  data.matchweeks[req.body.week].comments.push({
    username: req.oidc.user.name,
    content: req.body.comment,
  });
  console.log(data.matchweeks);
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  console.log(data.matchweeks[req.body.week].comments);
  data.matchweeks[req.body.week].comments.splice(req.body.index, 1);
  res.redirect("/");
});

app.listen(3000);
