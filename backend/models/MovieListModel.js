// models/movieListModel.js
import mongoose from 'mongoose';

const movieListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  movies: [
    {
      imdbID: {
        type: String,
        required: true
      },
      title: String,
      year: String,
      poster: String
    }
  ],
  isPublic: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const MovieList = mongoose.model('MovieList', movieListSchema);

export default MovieList;
