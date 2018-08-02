import React, { Component } from 'react';
import logo from './hn-logo.png';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
const Timestamp = require('react-timestamp');
const API = 'https://hacker-news.firebaseio.com/v0/';

class Item extends Component {
  render() {
      var post = this.props.post;
      return <li>
          <a href={post.url} className="post-link" target="_blank">{post.title}</a>
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
    this.state = { 
      posts: [],
      isLoading: false
     };
  }
  
  componentDidMount() {
      this.setState({ isLoading: true });
      this.fetchTopNews();
  }
  
  fetchTopNews() {
    fetch(API + 'topstories.json')
      .then(response => response.json())
      .then((data) => {
        // eslint-disable-next-line
        data.map((newsId) => {
          fetch(API + `item/${newsId}.json`)
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
    return  <ol className="posts">
          {this.state.posts.map(function (post) {
            
              return <Item key={post.id} post={post}/>

          })}
      </ol>
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