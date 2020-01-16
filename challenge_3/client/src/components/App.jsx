import React, { Component } from 'react';

import FormOnePersonal from './FormOnePersonal.jsx';
import FormTwoAddress from './FormTwoAddress.jsx';
import FormThreeCreditCard from './FormThreeCreditCard.jsx';
import DisplayClients from './DisplayClients.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      addressLineOne: '',
      addressLineTwo: '',
      city: '',
      state: '',
      phone: '',
      zipCode: '',
      creditCardNo: '',
      expiryDate: '',
      cvvNo: '',
      billZipCode: '',
      formOne: false,
      formTwo: false,
      formThree: false,
      clientDataPage: false
    }

    this.formClickHandler = this.formClickHandler.bind(this);
    this.postClientData = this.postClientData.bind(this);
  }

  postClientData() {
   
    console.log('POST is ready');
    console.log(this.state);
    fetch('/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(this.setState({
      clientDataPage : true
    }));

  }

  formClickHandler(event, formData) {
    event.preventDefault();

    this.setState({
      ...this.state,
      ...formData
    }
    , () => {
      // console.log(this.state);
      if(this.state.formThree) {
        this.postClientData();
      }  
    }
    );

  }

  render() {
    return (
      <div className="row">
        <div className="col col-2"></div>
        <div className="col col-8">
          {!this.state.formOne 
              ? 
              <FormOnePersonal clicker={this.formClickHandler}></FormOnePersonal>
              : 
            (!this.state.formTwo) 
              ?
              <FormTwoAddress clicker={this.formClickHandler}></FormTwoAddress> 
              : 
            (!this.state.formThree) 
              ? 
              <FormThreeCreditCard clicker={this.formClickHandler}></FormThreeCreditCard>
              :
            (this.state.clientDataPage)
              ?
              <DisplayClients></DisplayClients>
              :
              null
          }
          
        </div>
        <div className="col col-2"></div>
      </div>
    );
  }
}

export default App;