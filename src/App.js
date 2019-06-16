import React, { Component } from 'react'
import charactersFile from "./data/characters.json"
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    movies: [],
    loading: true,
    error: ''
  };
  componentDidMount() {

  }

  handleClick = character => {
    console.log(character.name);
    const PeopleUrl = `https://swapi.co/api/people/`;
    const FilmUrl = `https://swapi.co/api/films/`;

    switch (character.name) {
      case "Luke Skywalker":
        axios
          .get(`${PeopleUrl}1/`)
          .then(response =>
            Promise.all([
              axios.get(`${FilmUrl}2/`),
              axios.get(`${FilmUrl}6/`),
              axios.get(`${FilmUrl}3/`),
              axios.get(`${FilmUrl}1/`),
              axios.get(`${FilmUrl}7/`)
            ])
          )
          .then(result =>
            result.map(values =>
              this.setState({
                movies: [
                  ...this.state.movies,
                  {
                    title: values.data.title,
                    release_date: values.data.release_date
                  }
                ],
                loading: false,
                render: true
              })
            )
          );
        break;

      case "C-3PO":
        axios
          .get(`${PeopleUrl}2/`)
          .then(response =>
            Promise.all([
              axios.get(`${FilmUrl}2/`),
              axios.get(`${FilmUrl}5/`),
              axios.get(`${FilmUrl}4/`),
              axios.get(`${FilmUrl}6/`),
              axios.get(`${FilmUrl}3/`),
              axios.get(`${FilmUrl}1/`)
            ])
          )
          .then(result =>
            result.map(values =>
              this.setState({
                movies: [
                  ...this.state.movies,
                  {
                    title: values.data.title,
                    release_date: values.data.release_date
                  }
                ],
                loading: false,
                render: true
              })
            )
          );
        break;

      case "Leia Organa":
        axios.get(`${PeopleUrl}unknown/`)
          .then(response => console.log('response.data')
          ).catch(error => { throw (error) })
        break;

      case "R2-D2":
        axios
          .get(`${PeopleUrl}3/`)
          .then(response =>
            Promise.all([
              axios.get(`${FilmUrl}2/`),
              axios.get(`${FilmUrl}5/`),
              axios.get(`${FilmUrl}4/`),
              axios.get(`${FilmUrl}6/`),
              axios.get(`${FilmUrl}3/`),
              axios.get(`${FilmUrl}1/`),
              axios.get(`${FilmUrl}7/`)
            ])
          )
          .then(result =>
            result.map(values =>
              this.setState({
                movies: [
                  ...this.state.movies,
                  {
                    title: values.data.title,
                    release_date: values.data.release_date
                  }
                ],
                loading: false,
                render: true
              })
            )
          );
        break;

      default:
        return "No list item";
    }
  };

  render() {
    console.log(this.state);
    const Content = this.state.loading ? (
      <div style={{ marginTop: "20px", padding: "20px" }}>"Loading..."</div>
    ) : (
        <ul>
          {this.state.movies.map(movie => (
            <li key={movie.title}>
              {movie.title} - {movie.release_date}
            </li>
          ))}
        </ul>
      );

    const List = (
      <ul>
        {charactersFile.characters.map(character => {
          return (
            <li
              key={character.name}
              onClick={() => this.handleClick(character)}
            >
              {character.name}
            </li>
          );
        })}
      </ul>
    );

    return <div className="App">{!this.state.render ? List : Content}</div>;
  }
}

export default App;
