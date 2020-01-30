import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';



const validate = (values) => {
    let errors = [];
  
    if(!values.title)
    {
      errors.title="This is a required field"
    }

    if(!values.price)
    {
        errors.price="This is a required field"
    }
    
    
    return errors;
    };

class EditForm extends Component {

  

    // renderDropdown = () => {
    //     return(
    //         <select name="productAvailability">
    //           <option value="In Stock">In Stock</option>
    //           <option value="Out of Stock">Out of Stock</option>
    //         </select>
    //     )
    // }

    renderField = ({input,type,label,meta:{touched,error,warning}}) => {
        return(
          <div>
            <label><h2>{label}:</h2></label>
            <input {...input} type={type} className="myInput" />
            {touched && 
            (error && <div style={{color: "red"}}>{error}</div>)}
          </div>
        )
      }
    renderMessageField = ({input,type,label,meta:{touched,error,warning}}) => {
        return(
          <div>
            <label><h2>{label}:</h2></label>
            <textarea rows="10" cols="56" {...input} type={type} className="myTextArea" />
            {touched && 
            (error && <div style={{color: "red"}}>{error}</div>)}
          </div>
        )
      }
  

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
            <div>
                <Field name="title" component={this.renderField} type="text" label="Title"/>
            </div>
            <div>
                <Field name="price" component={this.renderField} type="number" label="Price"/>
            </div>
            <div>
            In Stock<Field name="available" component="input" type="checkbox">
            
          </Field>
            </div>
            <div>
             
                <Field name="description"
                component={this.renderMessageField}
                type="textarea" label="Description"/>
            </div>
            
            <input type="submit" value="Save changes" />
            <button onClick={this.props.reset}>Reset</button>

  
          </form>)
    }
}

export default reduxForm({form: 'product', validate})(EditForm)