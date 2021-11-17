//imports react and axios
import React, { Component } from "react";
import axios from "axios";

export class MovieDetail extends Component {
  //set default state of the following items to the following values
        state = {
        Actors: "",
        Awards: "",
        Country: "",
        Plot: "",
        Poster: "",
        Rated: "",
        Ratings: [],
        Title: "",
        imdbID: "",
        isLoading: true,
    };

    //uses componentDidMount method to set a variable to an axios get request
    async componentDidMount() {
        try {
        let result = await axios.get(
            `https://omdbapi.com/?apikey=46238870&t=${this.props.match.params.name}`
            
        );
        console.log(this.props.match);
    //sets state of each prop to the result value of each item
        this.setState({
            Actors: result.data.Actors,
            Awards: result.data.Awards,
            Country: result.data.Country,
            Plot: result.data.Plot,
            Poster: result.data.Poster,
            Rated: result.data.Rated,
            Ratings: result.data.Ratings,
            Title: result.data.Title,
            imdbID: result.data.imdbID,
            isLoading: false,
        });
        console.log(result);
    //catches the error and logs it
        } catch (e) {
            console.log(e);
        }
    }

    //creates funtional component to return the following jsx
    showMovieDetail = () => {
        return (
        <div style={{color: "white"}}>
            <div style={{marginTop: 30}}>
            <img src={this.state.Poster} alt={this.state.Title} />
            </div>
            <div style={{marginLeft: 20, marginTop: 25}}>
            <table>
                <tbody>
                    <tr>
                        <td>Title: </td>
                        <td>{this.state.Title}</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <td>Actors: </td>
                        <td>{this.state.Actors}</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <td>Awards: </td>
                        <td>{this.state.Awards}</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <td>Country: </td>
                        <td>{this.state.Country}</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <td>Plot: </td>
                        <td>{this.state.Plot}</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <td>Rated: </td>
                        <td>{this.state.Rated}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                Ratings:{" "}
            {this.state.Ratings.map((item) => {
                return (
                    <span key={item.Source}>
                        <div>
                        {item.Source}
                        </div>
                        <div>
                        {item.Value}
                        </div>
                        
                    </span>
            );
            })}
        </div>
        </div>
    </div>
    );
};

//renders the following jsx
render() {
    return (
    <div>
        {this.state.isLoading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            ...Loading
        </div>
        ) : (
        this.showMovieDetail()
        )}
    </div>
    );
    }
}
export default MovieDetail;