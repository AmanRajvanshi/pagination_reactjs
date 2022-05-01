import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      perPage: 5,
      currentPage: 0,
      offset: 0,

    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.fetch_data();
  }

  fetch_data = () => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      const data = res.data;
      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      const postData = slice.map((pd) => (
        <React.Fragment>
        </React.Fragment>
      ));

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        postData,
      });
    });
  };

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.fetch_data();
      }
    );
  };
  render() {
    return (
      <div>
        {this.state.postData}
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

export default App;
