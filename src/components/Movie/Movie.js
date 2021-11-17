import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import "./Movie.css"

export class Movie extends Component {
    //sets default state to the following props with the following values
    state ={
        movie: "",
        movieArray: [],
        error: ""
    };

    componentDidMount = async () =>{
        try{
            let payload = await axios.get(
                `https://omdbapi.com/?apikey=46238870&s=harry-potter`
            );
            this.setState({
                movieArray: payload.data.Search,
            });
        }catch(e){
            console.log(e);
        }
    }

    //creates handler function that sets following state
    handleOnChange = (event) => {
        this.setState({
            movie: event.target.value,
        });
    };

    //function that sets variable to ajax call and sets state movieArray to result.data.Search
    onClick = async (event) => {
        try{
            let result = await axios.get(
                `https://omdbapi.com/?apikey=46238870&s=${this.state.movie}`
            );
            this.setState({
                movieArray: result.data.Search,
            });
            let movieArray = result.data.Search.map((item)=>item.imdbID);
            let promiseMoviesArray = movieArray.map(async (item)=>{
                return await axios.get(
                    `https://omdbapi.com/?apikey=46238870&s=${item}`
                )
            })

            Promise.all(promiseMoviesArray)
            .then((result)=>{
                console.log(result);
            })
            .catch((e)=>{
                console.log(e);
            })
        }catch(e){
        };
    };

    //creates functional component that maps through movieArray and returns following jsx
    showMovieList = () =>{
        return this.state.movieArray.map((item)=>{
            return (
                <div key={item.imdbID} style={{width:300,height:600,marginRight:25,}}>
                    <Link 
                    style={{
                        textDecoration:"none", 
                        color: "white", 
                        fontFamily: "monospace"}} 
                        to={{pathname:`/movie-detail/${item.Title}`,
                        search:`?t=${item.Title}`}}>
                            <div>
                                <img src={item.Poster} alt={item.Title}/>
                            </div>
                            <div>
                                Title: {item.Title}<br/>
                                Year:{item.Year}
                            </div>
                    </Link>
                    <div>
                        {this.state.error}
                    </div>
                </div>
            );
        });
    };
    //renders following jsx
    render() {
        return (
            <div style={{backgroundColor: "#252525"}}>
                <div 
                style={{
                    width: 500,
                    margin: "0 auto",
                    textAlign: "center",
                    marginTop: 50
                }}>
                <input 
                type="text"
                placeholder="Search Movie"
                name="movie"
                onChange={this.handleOnChange}
                />
                <button onClick={this.onClick}>Search</button>
                </div>
                <div className="movie-div">
                    {this.showMovieList()}
                </div>
            </div>
        );
    };
};

export default Movie;
