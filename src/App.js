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

// Above is the es6 class components of search
// class Search extends Component {
//   render() {
//     return (
//       <form>
//         {this.props.children}
//         <input
//           type="text"
//           onChange={this.props.onChange}
//           value={this.props.value}
//         />
//       </form>
//     );
//   }
// }

const Search = ({ value, onChange, children }) => (
  <form>
    {children}
    <input type="text" onChange={onChange} value={value} />
  </form>
);

const Table = ({ list, pattern, onDismiss }) => (
  <div className="table">
    {list
      .filter(item => item.title.toLowerCase().includes(pattern.toLowerCase()))
      .map(item => (
        <div key={item.objectID} className="table-row">
          <span style={{ width: "40%" }}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={{ width: "30%" }}>{item.author}</span>
          <span style={{ width: "10%" }}>{item.num_comments}</span>
          <span style={{ width: "10%" }}>{item.points}</span>
          <span style={{ width: "10%" }}>
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
              type="button"
            >
              Dismiss
            </Button>
          </span>
        </div>
      ))}
  </div>
);

const Button = ({ onClick, className = "", children }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

// alternative way to do the search filtering(closure). Use by {this.props.list.filter(isSearched(searchItem)).map(...)}
// isSearched = searchTerm => item =>
//   item.title.toLowerCase().includes(searchTerm.toLowerCase);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { list, searchTerm: "" };
  }

  onDismiss = id => {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  };

  onSearchChange = event => {
    // console.log(event);
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    return (
      <div className="page">
        <div className="interactions">
          <Search value={this.state.searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
          <Table
            list={this.state.list}
            pattern={this.state.searchTerm}
            onDismiss={this.onDismiss}
          />
        </div>
      </div>
    );
  }
}

export default App;
