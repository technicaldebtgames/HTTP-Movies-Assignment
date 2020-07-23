import React, {useState, useEffect} from 'react';
import {useParams, useHistory, useLocation} from 'react-router-dom';

const emptyMovie = {
    title: '',
    director: '',
    metascore: 0,
    stars: []
}

const UpdateMovie = (props) => {

    const location = useLocation();
    const params = useParams();
    const {push} = useHistory();
    const [movie, setMovie] = useState(emptyMovie);

    useEffect(() => {
        if(location.state) {
            setMovie(location.state);
        }
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
        props.updateMovie(movie);
        setMovie(emptyMovie);
        push(`/movies/${params.id}`);
    };

    const handleChange = event => {
        event.persist();
        setMovie({...movie, [event.target.name]: event.target.value});
    };

    return (
        <div className='update-movie-container'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title: </label>
                <input type='text' name='title' onChange={handleChange} value={movie.title} />
                <br />
                <label htmlFor='director'>Director: </label>
                <input type='text' name='director' onChange={handleChange} value={movie.director} />
                <br />
                <label htmlFor='metascore'>Metascore: </label>
                <input type='text' name='metascore' onChange={handleChange} value={movie.metascore} />
                <br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );

};

export default UpdateMovie;