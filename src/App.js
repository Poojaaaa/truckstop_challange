import React, { Component } from 'react'
import charactersFile from "./data/characters.json"
import axios from 'axios';
import './App.css';

const Error = ({ message }) => <h3>{message}</h3>;

const Loader = () => (
  <div style={{ marginTop: "20px", padding: "20px" }}>"Loading..."</div>
);

const List = ({ handleClick }) => (
  <ul>
    {charactersFile.characters.map(character => {
      return (
        <li key={character.name} onClick={() => handleClick(character)}>
          {character.name}
        </li>
      );
    })}
  </ul>
);

const Content = ({ movies }) => (
  <ul>
    {movies.map(movie => (
      <li key={movie.title}>
        {movie.title} - {movie.release_date}
      </li>
    ))}
  </ul>
);

class App extends Component {

  state = {
    movies: [],
    loading: false,
    error: ''
  };

  handleClick = character => {
    // Set loading to true and error to false
    this.setState({ loading: true, error: false, movies: [] });
    console.log(character.name);

    axios
      .get(character.url)
      .then(({ data }) =>
        Promise.all(data.films.map(filmUrl => axios.get(filmUrl)))
      )
      .then(result => {
        const movies = result.map(({ data: { title, release_date } }) => ({
          title,
          release_date
        }));
        this.setState({ movies, loading: false, error: "" });
      })
      .catch(() => {
        this.setState({
          movies: [],
          loading: false,
          error: "List not found"
        });
      });
  };

  render() {
    const { error, loading, movies } = this.state;

    return (
      <div className="App">
        {/* include Content component only when there is data */}
        {movies.length > 0 ? (
          <Content movies={movies} />
        ) : (
            <List handleClick={this.handleClick} />
          )
        }

        {/* include Loader component when loading */}
        {loading && <Loader />}

        {/* include Error component when there is an error */}
        {error && <Error message={error} />}

      </div>);
  }
}

export default App;
