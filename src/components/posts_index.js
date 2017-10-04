import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
    componentDidMount() {
        this.props.fetchPosts(); //This kicks off the data loading
    }

    renderPosts() { //Need to use lodash to map over an object
        return _.map(this.props.posts, post => { //2nd argument: function where we render JSX to represent this post
            return ( 
                <li className="list-group-item" key={post.id}>
                    {post.title}
                </li>
            );
        });
    }

    render() {
        return(
            <div>
                <h3>
                    Posts
                </h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

//Whenever we want to consume anything from application level state, define:
function mapStateToProps(state) {
    return {posts: state.posts};
}

export default connect(mapStateToProps, {fetchPosts})(PostsIndex);
//This is the same as doing mapDispatchToProps. We still have access to
//this.props.fetchPosts