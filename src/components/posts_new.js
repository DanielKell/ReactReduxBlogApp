import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form'; //Reduxform is similar to connect!
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    
    renderField(field) { //this field object contains event handlers we need for the JSX!
        //If we put an input inside this return, how does the <Field> below know to connect to it?
        //It doesn't - until we use the above field object event handlers!

        const { meta: {touched, error} } = field; //Destruct meta, and touched/error OFF meta
        const className= `form-group ${touched && error ? 'has-danger' : ''}`;

         return (
            <div className={className}>
                <label> {field.label} </label> 
                <input
                    className="form-control"
                    type="text" 
                    {...field.input} //Pull all the event handlers out
                />
                <div className="text-help">
                    {touched ? error: ""} 
                </div>
            </div> //The field.meta.error connects our error messages to field name
         );
    }

    onSubmit(values) {
        //this === component
        this.props.createPost(values);
        console.log(values);
    }

    render() {
        const { handleSubmit } = this.props; //Pulling this off from ReduxForm 
        return ( //this onSubmit is needed to deal with form submittal
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}> 
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
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel </Link>
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
}) (
    connect(null, {createPost}) (PostsNew)
); //Two sets of things passed into this helper
