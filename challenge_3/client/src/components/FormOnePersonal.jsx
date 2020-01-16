import React from 'react';

class FormOnePersonal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      formOne: false
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value 
    }
    // , () => console.log(this.state)
    );   
  }

  onSubmitHandler(event) {
    event.persist(); // or use event.preventDefault(); here and not in App.js
    // Do addition check if required on input data

    this.setState({
      formOne: true
    }, () => this.props.clicker(event, this.state));
     // Call the function passed from App Component
  }

  render() {

    return(
      <div>
        <h1>Personal Details</h1>
        <form onSubmit={this.onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input name="name" type="text" id="name" value={this.state.name} onChange={this.onChangeHandler} className="form-control" required/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input name="email" type="email" id="email" value={this.state.email} onChange={this.onChangeHandler} className="form-control" required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input name="password" type="password" id="password" value={this.state.password} onChange={this.onChangeHandler} className="form-control" minLength="5" maxLength="10" required/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );

  }

};

export default FormOnePersonal;