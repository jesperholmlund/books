const express = require("express");
const app = express();
const mongo = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://jesholmlund:WCvaMgMGosB986gJ@cluster0.dlnpg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const cors = require("cors");
const { ObjectId } = require("mongodb");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

app.listen(3001, (req, res) => {
  console.log("listening");
  mongo
    .connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((client) => {
      const db = client.db("posts");
      const dbEras = db.collection("posts");
      const dbBooks = db.collection("books");
      app.get("/api", (req, res) => {
        dbBooks
          .find()
          .toArray()
          .then((result) => {
            console.log(result);
            res.json(result);
          });
      });
      app.get("/api/eras", (req, res) => {
        dbEras
          .find()
          .toArray()
          .then((era) => {
            res.json(era);
            console.log(era);
          });
      });
      app.get("/api/:id", (req, res) => {
        let query = { _id: ObjectId(req.params.id) };
        dbBooks.findOne(query).then((result) => {
          res.json(result);
        });
      });
      app.delete("/api/delete/:id", (req, res) => {
        let query = { _id: ObjectId(req.params.id) };
        dbBooks.deleteOne(query);
      });
      app.post("/api/post", (req, res) => {
        let obj = {
          title: req.body.title,
          content: req.body.content,
          author: req.body.author,
          era: req.body.era,
          link: req.body.link,
        };
        dbBooks.insertOne(obj);
      });
      app.put("/api/update/:id", (req, res) => {
        let query = { _id: ObjectId(req.params.id) };
        const data = {
          $set: {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            link: req.body.link,
            image: req.body.image,
          },
        };
        dbBooks.findOneAndUpdate(query, data);
      });
    });
});
