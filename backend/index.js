const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const StaffsModel = require("./models/staffs");
const ImageModel = require("./models/image");

const app = express();
app.use(express.json()); // convert user details to json format
app.use(cors()); // use to send data to the backend
app.use(express.static("public"));
app.use(
  cors({
    origin: ["http://localhost:3000", ""],
    methods: ["POST", "GET", "PUT", "DELETE", "UPDATE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// ('mongodb://localhost:27017/employee') // connection string
mongoose.connect(
  "mongodb+srv://johnotene1990:Otene1990@@cluster0.51fq2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
//uploading images in backend or server
const store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: store,
});

app.post("/upload", upload.single("file"), (req, res) => {
  // console.log(req.file)
  ImageModel.create({ image: req.file.filename })
    .then((image) => res.json(image))
    .catch((err) => res.json(err));
});

// how to get image details
app.get("/getImage", (req, res) => {
  ImageModel.find()
    .then((image) => res.json(image))
    .catch((err) => res.json(err));
});

// to register a user
app.post("/register", (req, res) => {
  StaffsModel.create(req.body)
    .then((staffs) => res.json(staffs))
    .catch((err) => res.json(err));
});

// registered a new user
app.post("/create", (req, res) => {
  StaffsModel.create(req.body)
    .then((staffs) => res.json(staffs))
    .catch((err) => res.json(err));
});

// get all the user details
app.get("/", (req, res) => {
  StaffsModel.find({})
    .then((staffs) => res.json(staffs))
    .catch((err) => res.json(err));
});

// to get a single user details
app.get("/getuser/:id", (req, res) => {
  const id = req.params.id;
  StaffsModel.findById({ _id: id })
    .then((staffs) => res.json(staffs))
    .catch((err) => res.json(err));
});

//update single user detail
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  StaffsModel.findByIdAndUpdate({ _id: id }),
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      city: req.body.city,
    }
      .then((staffs) => res.json(staffs))
      .catch((err) => res.json(err));
});

// to get user details
app.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  StaffsModel.findById({ _id: id })
    .then((staffs) => res.json(staffs))
    .catch((err) => res.json(err));
});

// delete a user
app.delete("/delete/:id", (req, res) => {
  StaffsModel.findByIdAndDelete({ _id: req.params.id })
    .then((staffs) => res.json(staffs))
    .catch((err) => res.json(err));
});

// login a registered user
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  StaffsModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("success");
      } else {
        res.json("password is incorrect");
      }
    } else {
      res.json("Record doesn't exist");
    }
  });
});

// connect to server
app.listen(8080, () => {
  console.log("server is running");
});
