const bodyParser = require("body-parser");
const app = require("express")();
const jwt = require("jsonwebtoken");
const path = require("path");
const Sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Op = Sequelize.Op;
// const { db } = require(path.join(process.cwd(), "/firebase"));
const cors = require("cors");

var initModels = require(path.join(process.cwd(), "/models/init-models"))
  .initModels;
var sequelize = new Sequelize(
  "postgres://racrmerrhckagl:a253b67de5b66c7764dd8b40afe57c3ad3f7e1b37db1b5cd67bb978cbfe5e812@ec2-107-22-83-3.compute-1.amazonaws.com:5432/dro0efdojnr4u",
  {
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
);
var models = initModels(sequelize);

app.use(cors());
app.use(bodyParser.json());

app.all("/testAPI", (req, res) => {
  res.send("api");
});

app.post("/auth/signIn", async (req, res) => {
  var { email, password } = req.body;

  var user = await models.users.findOne({
    where: { email: email, password: password }
  });

  if (!user) {
    return res.status(400).json({
      message: "email or password invalid"
    });
  }

  jwt.sign({ user: user }, "nuttapong", (err, token) => {
    res.json({ token });
  });
});

app.post("/auth/signOut", (req, res) => {
  res.json({
    success: true
  });
});

app.get("/auth/user", async (req, res) => {
  var token = req.get("Authorization").replace("Bearer ", "");
  jwt.verify(token, "nuttapong", function(err, decoded) {
    if (err) {
      return res.status(401).json(err);
    }
    res.json({ user: decoded.user });
  });
});

app.get("/users", async (req, res) => {
  res.json({
    data: await models.users.findAll()
  });
});

app.post("/chat/send", async (req, res) => {
  let { message, user_id } = req.body;

  let chat = await models.chat.create({ message: message, users_id: user_id });

  var msgObj = {
    last_updated: Date.now()
  };

  // await db.ref("msg").set(msgObj, error => {
  //   if (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: "error",
  //       data: error
  //     });
  //   }
  // });

  res.json({
    message: "success",
    success: true
  });
});

app.get("/chat/list", async (req, res) => {
  try {
    let chatList = await models.chat.findAll({
      order: [["id", "ASC"]]
    });

    res.json({
      success: true,
      message: "success",
      data: chatList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error",
      data: error
    });
  }
});

app.get("/chat/newMessage/:chatId", async (req, res) => {
  try {
    let chatId = req.params.chatId;

    let chatList = await models.chat.findAll({
      where: { id: { [Op.gt]: chatId } },
      order: [["id", "DESC"]]
    });

    res.json({
      success: true,
      message: "success",
      data: chatList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error",
      data: error
    });
  }
});
module.exports = app;
