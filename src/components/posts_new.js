import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form'; //Reduxform is similar to connect!

class PostsNew extends Component {
    
    renderTitleField(field) { //this field object contains event handlers we need for the JSX!
        //If we put an input inside this return, how does the <Field> below know to connect to it?
        //It doesn't - until we use the above field object event handlers!
         return (
            <div>
                <input
                    type="text"
                    {...field.input} //Pull all the event handlers out
                />
            </div>
         );
    }

    render() {

        return (
            <form>
                <Field
                    name="title" //What piece of state are we editing?
                    component={this.renderTitleField} //Function to display this component
                />
            </form>
        );
    }
}

export default reduxForm({
    form: 'PostsNewForm' //If we show multiple forms, Redux will handle it correctly with this
}) (PostsNew); //The string must be unique.
