import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
    componentDidMount() {
        this.props.fetchPosts(); //This kicks off the data loading
    }

    render() {
        return(
            <div>
                Posts Index
            </div>
        );
    }
}

export default connect(null, {fetchPosts})(PostsIndex);
//This is the same as doing mapDispatchToProps. We still have access to
//this.props.fetchPosts