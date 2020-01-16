import React from 'react';

import  usStateNames  from '../../dist/us-state-data.js';

class FormTwoAddress extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      addressLineOne: '',
      addressLineTwo: '',
      city: '',
      state: '',
      phone: '',
      zipCode: '',
      formTwo: false
    }

    this.changeHandler = this.changeHandler.bind(this);
    this.makeStateNamesElements = this.makeStateNamesElements.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  makeStateNamesElements() {

    let elementCollector =  usStateNames.map( element => {
      return(<option key={element.stateAbbreviation} value={element.stateAbbreviation}>{element.stateName}</option>)
    });
    return(elementCollector);
  };

  changeHandler (event) {
    this.setState({
      [event.target.name]: event.target.value
    }
    // , () => console.log(this.state)
    ); 
  };

  onSubmitHandler(event) {
    event.persist(); // or use event.preventDefault(); here and not in App.js
    // Do addition check if required on input data

    this.setState({
      formTwo: true
    }, () => this.props.clicker(event, this.state));
     // Call the function passed from App Component
  }

  render() {

    return(
      <div>
        <h1>Shipping Details</h1>
        <form onSubmit={this.onSubmitHandler}>
          <div className="form-group">
            <label htmlFor='addressLineOne'>Mailing Address</label>
            <input name="addressLineOne" id="addressLineOne" onChange={this.changeHandler}  type="text" className="form-control" required />
          </div>
          <div className="form-group">
            <input name="addressLineTwo" id="addressLineTwo" onChange={this.changeHandler}  type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor='city'>City</label>
            <input name="city" id="city" onChange={this.changeHandler}  type="text" className="form-control" required />
          </div>
          <div className="form-group">
          <label htmlFor="state">State</label>
            <select name="state" className="form-control" onChange={this.changeHandler}>
              {this.makeStateNamesElements()}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor='phone'>Phone No</label>
            <input name="phone" id="phone" onChange={this.changeHandler}  type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="XXX-XXX-XXXX" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor='zipCode'>ZipCode</label>
            <input name="zipCode" id="zipCode" onChange={this.changeHandler}  type="text" minLength="5" maxLength="5" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );

  };
};

export default FormTwoAddress;