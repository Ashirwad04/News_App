// News.js

import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {

  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2f520ce7c7b747fbb3f1e87e2f5dcaf4&page=1&pageSize=20`;

    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults
    });
  }

  handlePreviusClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2f520ce7c7b747fbb3f1e87e2f5dcaf4&page=${this.state.page - 1}&pageSize=20`;

    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    });
  };

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
      return;
    }

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2f520ce7c7b747fbb3f1e87e2f5dcaf4&page=${this.state.page + 1}&pageSize=20`;

    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1>News Headlines</h1>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviusClick}
          >
            &larr; Previous
          </button>

          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;