import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const updateMovie = movie => {
    let newMovieList = movieList.map(item => {
      if(item.id === movie.id){
        return movie;
      }
      else
        return item;
    });
    axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(response => {
        setMovieList(newMovieList);
        getMovieList();
        console.log('Update movie success.'); // this runs but doesn't update state when i call getMovieList..?
      })
      .catch(error => {
        console.log('Error when updating movie.');
        console.log(error);
      });
  };

  const deleteMovie = movie => {
    let newMovieList = movieList.filter(item => item.id !== movie.id);
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`, movie.id)
      .then(response => {
        setMovieList(newMovieList);
        getMovieList();
        console.log('Delete movie success.');
      })
      .catch(error => {
        console.log('Error when deleting movie.');
        console.log(error);
      })
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Switch>

        <Route exact path="/">
          <MovieList movies={movieList} />
        </Route>

        <Route path="/movies/:id">
          <Movie addToSavedList={addToSavedList} deleteMovie={deleteMovie} />
        </Route>

        <Route path="/update-movie/:id" render={props => <UpdateMovie {...props} updateMovie={updateMovie}/>} />
      
      </Switch>

    </>
  );
};

export default App;
