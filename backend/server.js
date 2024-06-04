import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import User from './models/UserModel.js'
import MovieList from "./models/MovieListModel.js";
import auth from "./middleware/auth.js"
//app config
dotenv.config()
const app = express()
const port = 3002
const URI = process.env.MONGO_URI;
mongoose.set('strictQuery', true);

//middlewares
app.use(express.json())

app.use(cors({
    // origin: 'http://localhost:3000',
    origin: 'https://movie-lists-client.vercel.app/',
    credentials: true // Enable credentials
}));

//db config
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3002, () => {
      console.log(`Server running on port ${process.env.PORT || 3002}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
  app.post("/api/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log(req.body);
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({ username: name,email, password: hashedPassword });
      await user.save();
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
//listen

app.post("/api/login",async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body,"  login backend -1 ");
      const user = await User.findOne({ email });
      console.log(user , " login backend console-2");
      console.log(user._id , " login backend console-3");
      if (!user) {
        throw new Error("Invalid login credentials");
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new Error("Invalid login credentials");
      }
      const token = await jwt.sign({ userId: user._id }, "secretKey", {
        expiresIn: "1h",
      });
      console.log("Token" + token, "login backend -3 ");
      res.send({ message: "Login successful", token }); // Send token in response
    } catch (error) {
      res.status(401).send({ error: error.message });
    }
  });

// Create a new list
app.post("/api/create",auth, async (req, res) => {
  // const { name, isPublic } = req.body;
  // console.log(name, isPublic);
  // console.log(req.userId);
  try {
      //  console.log("in try catch server .js")
        const { name, isPublic } = req.body;
        // console.log(req.userId , "user Id in server.js");
        const newList = new MovieList({
          userId: req.userId,
          name,
          isPublic,
          movies: [],
        });
        // console.log("in try catch server .js")
        await newList.save();
        res.status(201).send({ message: 'List created successfully', list: newList });
      } catch (error) {
        console.log("in error");
        res.status(400).send({ error: error.message });
      }
  });
  
  // Add movie to a list
  app.post('/api/add-movie/:listId',auth, async (req, res) => {
    try {
      const { imdbID, title, year, poster } = req.body;
      const list = await MovieList.findById(req.params.listId);
  
      if (!list) {
        return res.status(404).send({ error: 'List not found' });
      }
  
      if (list.userId.toString() !== req.userId.toString()) {
        return res.status(403).send({ error: 'You do not have permission to add movies to this list' });
      }
  
      list.movies.push({ imdbID, title, year, poster });
      await list.save();
      res.status(200).send({ message: 'Movie added to the list successfully', list });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
  
  // Fetch user's lists
  app.get('/api/my-lists',auth, async (req, res) => {
    
    try {
        console.log(":in private try")
        const lists = await MovieList.find({ userId: req.userId });
        // console.log(lists);
        res.status(200).send(lists);
      } catch (error) {
        console.log("in private catch")
        res.status(400).send({ error: error.message });
      }
  });
  
  // Fetch public lists
  app.get('/api/public-lists',auth, async (req, res) => {
    try {

      const lists = await MovieList.find({ isPublic: true });
      console.log(":in public")
      
      res.status(200).send(lists);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
  
// delete a createdd list

app.delete('/api/lists/:id', auth, async (req, res) => {
  try {
    const userId = req.userId;
    const result = await MovieList.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'List not found' });
    }
    res.status(200).json({ message: 'List deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// deleting a movie

app.delete('/api/lists/:id/movies/:movieId',auth, async(req, res) =>{
  try {
    console.log("in try of movie deletion")
    const { id, movieId } = req.params;
    const userId = req.userId;
    const list = await MovieList.findOne({ _id: id, user: userId });
    if(!list){
      return res.status(404).json({error:'List not found'});

    }
    list.movies = list.movies.filter(movie => movie.imdbID != movieId);
    await list.save();
    res.status(200).json({message:'Movie deleted succefully'});
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

app.patch('/api/lists/:id', auth, async (req, res) => {
  try {
    const userId = req.userId;
    const { name } = req.body;
    const result = await MovieList.findByIdAndUpdate(
      req.params.id,
      {name:name},
      {new:true}

    );
    if (!result) {
      return res.status(404).json({ error: 'List not found' });
    }
    res.status(200).json({ message: 'List name updated successfully' });
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
});

  
app.listen(port, () => console.log(`Server Running on PORT:${port}`))