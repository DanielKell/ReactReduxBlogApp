//To handle data requests, we need axios to handle the request, and redux
//promise to handle the promises
import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?keyANYRANDOMKEY';

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    return {
        type: FETCH_POSTS,
        payload: request
    };
}

/*
Summary of what is happening here:
1. Making the axios request 
2. Assign it to the variable request
3. Assign it to the payload in the action creator.
4. Because the request is assigned to payload, redux promise middleware will
automatically deal with the promise, when it sees this action called.
5. When it appears in the reducer, the payload will contain the response object
in axios.
*/