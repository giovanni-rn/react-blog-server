// imports
const postModel = require("../models/post.model"); // database collection containing all posts
const ObjectID = require("mongoose").Types.ObjectId; // verify ID is a true MongoDB ID

// fetch every post
module.exports.allposts = (req, res) => {
  postModel
    .find((err, docs) => {
      if (!err)
        return res.status(200).send(docs); // return JSON with all posts found
      else return res.status(400).send("Error to get data : " + err); // no post could be fetched
    })
    .sort({ createdAt: -1 }); // sort by created time
};

// fetch one specific post
module.exports.onepost = (req, res) => {
  // check id is valid
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id); // id in url params is not valid

  postModel.findById(req.params.id, (err, docs) => {
    // return JSON with the post matching the id
    if (!err) return res.status(200).send(docs);
    else return res.status(400).send("Error to get data : " + err); // no matching post
  });
};

// search a post
module.exports.searchpost = (req, res) => {
  postModel.find(
    { title: { $regex: req.params.query, $options: "i" } }, // search a post which contains query in its title
    (err, docs) => {
      if (!err) return res.send(docs); // return the posts found
      else return res.status(404).send("Error to get data : " + err); // no post found
    }
  );
};

// add one post to db
module.exports.addpost = async (req, res) => {
  const newpost = new postModel({
    // create a new post with schema fields
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    content: req.body.content,
  });

  try {
    const post = await newpost.save(); // add the new post to the database
    return res.status(201).json(post); // return the created post
  } catch (err) {
    return res.status(400).json(err); // post could not be created
  }
};
