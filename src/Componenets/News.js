import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  articles =[  ]

  constructor() {
    super();
    // console.log("Hellow i am construcotr");

    this.state = {
      articles: this.articles,
      loading: false
    }
  }


async componentDidMount() {
  console.log("cdm");
  
  let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2f520ce7c7b747fbb3f1e87e2f5dcaf4";
  
  let data = await fetch(url);
  let parseddata = await data.json(); // ✅ FIXED
  
  console.log(parseddata); // better to log this
  
  this.setState({ articles: parseddata.articles });
}

  render() {
    console.log("render");
    return (
      <div className='container my-3'>
        <h2>News Headlines</h2>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem 
                  title={element.title?element.title.slice(0,45):" "} 
                  description={element.description?element.description.slice(0,88):" "} 
                  imageUrl={element.urlToImage} 
                  newsUrl={element.url}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default News