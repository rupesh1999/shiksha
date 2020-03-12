import React, { Component } from "react";
import SearchComponent from "../../components/searchComponent/searchComponent";

class SearchContainer extends Component {
    state = {
        searchValue : ""
    }

    onChangeHandeler = (event) => {
        this.setState({searchValue: event.target.value});
        //console.log(this.state.searchValue);
    }

    onClickhandeler = () => {
        console.log("Sending query to solr instance with search param as " + this.state.searchValue);
    }

    render() {
        return (
            <div>
                <SearchComponent onChangeHandeler={this.onChangeHandeler} />
                <button onClick = {this.onClickhandeler}>Search</button>
            </div>
        );
    };
};

export default SearchContainer;