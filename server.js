import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();

let authSecret = null;
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // For legacy browser support
  // methods: "GET, PUT"
};

//middlewares
app.use(cors(corsOptions));
app.use(express.json());

app.get("/auth/login", (req, res) => {
  res.sendFile(
    "C:/Web Development/Projects/react-authentication/node-server/index.html"
  );
});
app.get("/generateTokens", (req, res) => {
  const authCode = req.query.code;
  if (authCode === authSecret) {
    const token = jwt.sign(
      {
        user: "saurav",
      },
      "secret",
      { expiresIn: 60 }
    );
    const refreshToken = jwt.sign(
      {
        user: "saurav",
        type: "refresh",
      },
      "secret",
      { expiresIn: 120 }
    );

    const data = {
      token,
      refreshToken,
    };

    res.status(200).send(data);
  } else {
    res.status(401).send("Unauthorized");
  }
});
app.get("/generateAuthCode", (req, res) => {
  authSecret = `auth${Math.floor(Math.random() * 10)}`;
  res.redirect(`http://localhost:3000/auth/callback?code=${authSecret}`);
});


app.get("/getResource", (req, res) => {
    
  const authHeader = req.get("Authorization");
 
  

  if (authHeader == undefined) {
  
    res.status(401).send("no header");
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    res.status(401).send("no token");
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret");
    res.status(200).send({resource:"Resource is all yours"});
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
});
app.get("/getResource2", (req, res) => {
    
  const authHeader = req.get("Authorization");
 
  

  if (authHeader == undefined) {
  
    res.status(401).send("no header");
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    res.status(401).send("no token");
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret");
    res.status(200).send({resource:"Resource2 is all yours"});
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
});
app.get("/getResource3", (req, res) => {
    
  const authHeader = req.get("Authorization");
 
  

  if (authHeader == undefined) {
  
    res.status(401).send("no header");
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    res.status(401).send("no token");
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret");
    res.status(200).send({resource:"Resource3 is all yours"});
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
});
app.post("/refreshAccessToken", (req, res) => {
  

  const refreshToken = req.body.refreshToken;
  let decodedToken;

  try {
    decodedToken = jwt.verify(refreshToken, "secret");

    
    const token = jwt.sign(
        {
          user: "saurav",
        },
        "secret",
        { expiresIn: 112 }
      );
    res.status(200).send({token});
  } catch (err) {
    res.status(401).send("Invalid Refresh Token");
  }
});

app.get('/logout',(req,res)=>{
    authSecret = null;
    console.log("authSec set to null, logout")
    res.status(200).send("Logout Successfull")
})
app.listen(5000, () => {
  console.log("Listening at Port 5000");
});
