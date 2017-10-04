import { FETCH_POSTS } from '../actions/index';
import _ from 'lodash';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');

        default: 
        return state;
    }
}

/*
Because the data we are getting in our action is returned as an array,
we want to convert it into an object, where the "id"s inside the array's object
become the "key" of the new object. We can use lodash's .mapKeys function to 
convert an array to an object. The two parameters are (ArrayWeAreTransforming, 
pieceThatWeWantToTurnIntoKey)
 */