import React, { Component } from 'react';
import logo from './hn-logo.png';
import './App.css';
const Timestamp = require('react-timestamp');

class Item extends Component {
  render() {
      var post = this.props.post;
      return <li>
          <a href={post.url} className="post-link">{post.title}</a>
          <Footer post={post}/>
     </li>;
  }
}

class Footer extends Component {
  render() {
      var post = this.props.post;
      return <small>
          {post.score} points by {post.by} | <Timestamp time={post.time} /> | { post.descendants } { post.descendants === 1 ? ' comment' : ' comments' }
      </small>;
  }
}

class Posts extends Component {
  constructor() {
    super();
    this.state = { posts: [] };
  }
  
  componentDidMount() {
      this.fetchLatestNews();
  }
  
  fetchLatestNews() {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => response.json())
      .then((data) => {
        data.map((newsId) => {
          fetch(` https://hacker-news.firebaseio.com/v0/item/${newsId}.json`)
          .then(response => response.json())
          .then((itemDetail) => {
            console.log(`Fetched ${itemDetail.id}`)
            this.setState((currentState) => {
              currentState.posts.push(itemDetail);
              return { posts: currentState.posts };
            })
          })
        });
    })
  }
  
  render() {
      return <ol className="posts">
          {this.state.posts.map(function (post) {
              return <Item key={post.id} post={post}/>
          })}
      </ol>;
  }
}

class Header extends Component {
  render() {
      return <header>
        <div className="App-header">
          <div className="App-brand"><img src={logo} className="App-logo" alt="logo" /> Hacker News</div>
        </div>
      </header>
  }
}

class App extends Component {
  render() {
      return <div>
          <Header/>
          <div className="container content">
              <Posts/>
          </div>
      </div>;
  }
}

export default App;

/*
class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-brand"><img src={logo} className="App-logo" alt="logo" /> Hacker News</div>
        </header>
        <main className="container">
          <p className="App-intro">
          if (error) {
            <div>Error: {error.message}</div>
          } else if (!isLoaded) {
            <div>Loading...</div>
          } else {
              <ul>
                {items.map(item => (
                  <li key={item.name}>
                    {item.name} {item.price}
                  </li>
                ))}
              </ul>
          }
          </p>
        </main>
      </div>
    );
    
    
  }
}

export default App;
*/