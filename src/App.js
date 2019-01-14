import React, { Component } from "react";
import "./App.css";
import axios from "axios";
/*
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
*/
const DEFAULT_QUERY = "redux";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";

/*
Below is the es6 class components of search
class Search extends Component {
  render() {
    return (
      <form>
        {this.props.children}
        <input
          type="text"
          onChange={this.props.onChange}
          value={this.props.value}
        />
      </form>
    );
  }
}
*/
const Search = ({ value, onSubmit, onChange, children }) => (
  <form onSubmit={onSubmit} onChange={onChange}>
    <input type="text" defaultValue={value} />
    <button type="submit">{children}</button>
  </form>
);

const Table = ({ list, onDismiss }) => (
  <div className="table">
    {list.map(item => (
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
    this.state = { searchTerm: DEFAULT_QUERY, result: null };
  }

  onDismiss = id => {
    const updatedHits = this.state.result.hits.filter(
      item => item.objectID !== id
    );
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    });
  };

  getSearchResult = (searchTerm, page = 0) => {
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;
    console.log(url);
    axios(url)
      .then(result => this.onGetSearchResult(result.data))
      .catch(error => error);
  };

  onSearchChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  onSearchSubmit = event => {
    this.getSearchResult(this.state.searchTerm);
    event.preventDefault();
  };

  onGetSearchResult = result => {
    const { hits, page } = result;
    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({ result: { hits: updatedHits, page } });
  };

  render() {
    const { searchTerm, result } = this.state;
    const page = (result && result.page) || 0;
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onSubmit={this.onSearchSubmit}
            onChange={this.onSearchChange}
          >
            Search
          </Search>
        </div>
        {result && <Table list={result.hits} onDismiss={this.onDismiss} />}
        <div>
          <Button onClick={() => this.getSearchResult(searchTerm, page + 1)}>
            More
          </Button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getSearchResult(this.state.searchTerm);
  }
}

export default App;
