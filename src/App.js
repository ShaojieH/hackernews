import React, { Component } from "react";
import "./App.css";

const list = [
  {
    title: "React",
    url: "https://reactjs.org",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://redux.js.org",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

class App extends Component {
  render() {
    const hello = "Welcome to the Road to learn react!!";
    const user = { firstName: "Tom", lastName: "Hou" };
    return (
      <div className="App">
        <h2>{hello}</h2>
        <h2>
          Name:{user.firstName} {user.lastName}
        </h2>
      </div>
    );
  }
}

export default App;
