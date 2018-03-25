import React, {Component} from 'react';
import RedditListing from './RedditListing';

export default class Reddit extends Component {
  state = {
    posts: {}
  };

  componentDidMount() {

    // FETCH LIVE DATA FROM REDDIT
    fetch('http://www.reddit.com/r/reactjs.json')
      .then(res => res.json())
      .then(json => this.processPosts(json.data.children))
      .catch(err => console.log(err));
  }

  processPosts = (posts) => {
    // DATA USAGE SIMPLIFIED
    let postsHash = posts.reduce((hash, post) => {
      hash[post.data.id] = post.data;
      return hash;
    }, {});

    this.setState({
      posts: postsHash
    });
  }

  handleUpvote = (postId) => {
    // UPDATE THE POST
    this.setState({
      // SET POSTS
      posts: {
        // EVERY EXISTING POST, BUT THEN...
        ...this.state.posts,
        // REPLACE THE ONE AT 'postId' WITH
        [postId]: {
          // ALL THE KEYS/VALUES IT ORIGINALLY HAD, BUT...
          ...this.state.posts[postId],
          // REPLACE 'SCORE' WITH A NEW VALUE
          score: this.state.posts[postId].score + 1
        }
      }
    });
  }

  handleDownvote = (postId) => {
    // UPDATE POST
    this.setState({
      // SET POSTS
      posts: {
        // EVERY EXISTING POST, BUT THEN...
        ...this.state.posts,
        // REPLACE THE ONE AT 'postId' with...
        [postId]: {
          // ALL THE KEYS/VALUES IT ORIGINALLY HAD, BUT...
          ...this.state.posts[postId],
          // REPLACE 'SCORE' WITH A NEW VALUE
          score: this.state.posts[postId].score - 1
        }
      }
    });
  }

  render() {
    const posts = Object.keys(this.state.posts)
      .map(id => this.state.posts[id]);

    return (
      <RedditListing
        posts={posts}
        onUpvote={this.handleUpvote}
        onDownvote={this.handleDownvote} />
    );
  }
}
