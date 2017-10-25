import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form'; //Reduxform is similar to connect!

class PostsNew extends Component {
    
    renderField(field) { //this field object contains event handlers we need for the JSX!
        //If we put an input inside this return, how does the <Field> below know to connect to it?
        //It doesn't - until we use the above field object event handlers!
         return (
            <div className="form-group">
                <label> {field.label} </label> 
                <input
                    className="form-control"
                    type="text" 
                    {...field.input} //Pull all the event handlers out
                />
                {field.meta.error} 
            </div> //The field.meta.error connects our error messages to field name
         );
    }

    render() {
        return (
            <form>
                <Field
                    label="Title for Post" //Connected to the (field.label) above
                    name="title" //What piece of state are we editing?
                    component={this.renderField} //Function to display this component
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
            </form>
        );
    }
}

function validate(values) { //an object that contains all values a user has entered
    const errors = {};  

    //Validate the inputs from 'values'
    if (!values.title || values.title.length < 3) { //If the title is empty, display this message!
        errors.title = "Enter a title with more than 3 characters!";
    }
    if (!values.categories) { 
        errors.categories = "Enter some categories!";
    }
    if (!values.content) { 
        errors.content = "Enter some content!";
    }

    return errors; //If errors is empty, the form is fine to submit
    //If errors has any properties, redux form assumes form is invalid
}

export default reduxForm({
    validate: validate,
    form: 'PostsNewForm' //If we show multiple forms, Redux will handle it correctly with this
}) (PostsNew); //The string must be unique.
