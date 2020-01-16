import React, { Component } from 'react';

import calenderMonths from '../../dist/calender-month.js';

class FormThreeCreditCard extends Component {

  constructor(props) {
    super(props)

    this.state  = {
      data: {
        creditCardNo: '',
        expiryDate: '',
        cvvNo: '',
        billZipCode: '',
        formThree: false
      },
      holder: {
        creditCard1 : '',
        creditCard2 : '',
        creditCard3 : '',
        creditCard4 : '',
        creditMonth: '',
        creditYear: ''
      }
    }

    this.changeHandler = this.changeHandler.bind(this);
    this.changeHolderHandler = this.changeHolderHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.makeCalenderMonthsElements = this.makeCalenderMonthsElements.bind(this);
    this.makeCalenderYearsElements = this.makeCalenderYearsElements.bind();
  }

  changeHandler (event) {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value
      }
      
    }
    // , () => console.log(this.state)
    ); 
  };

  changeHolderHandler (event) {
  
    this.setState({
      holder: {
        ...this.state.holder,
        [event.target.name]: event.target.value
      }
      
    }
    // , () => console.log(this.state)
    ); 
  };



  onSubmitHandler(event) {
    event.preventDefault();
    event.persist(); // or use event.preventDefault(); here and not in App.js
    // Do addition check if required on input data

    this.setState({
      data: {
        ...this.state.data,
        creditCardNo: this.state.holder.creditCard1.toString() + this.state.holder.creditCard2.toString() + this.state.holder.creditCard3.toString() + this.state.holder.creditCard4.toString(),
        expiryDate: this.state.holder.creditMonth.toString() + '-' + this.state.holder.creditYear.toString(),
        formThree : true  
      }
    }
    , () => this.props.clicker(event, this.state.data)
    );
     // Call the function passed from App Component
  };

  makeCalenderMonthsElements() {

    let elementCollector =  calenderMonths.map( element => {
      return(<option key={element.monthName} value={element.monthValue}>{element.monthName}</option>)
    });
    return(elementCollector);
  };

  makeCalenderYearsElements() {

    // let currentYear = new Date().getFullYear()
    let currentYear = 2020;
    let elementCollector = [];

    for(let i = currentYear; i < currentYear+ 15; i++) {
      elementCollector.push(<option key={i} value={i}>{i}</option>);
    }
    return(elementCollector);
  };

  render() {
    
    return(
      <div>
        <h1>Payment Details</h1>
        <form onSubmit={this.onSubmitHandler}>

            <div className="form-group">
              <label htmlFor='creditCard1'>Credit Card No</label>
              <br/>
              <input name="creditCard1" id="creditCard1" onChange={this.changeHolderHandler}  type="text" minLength="4" maxLength="4" className="col col-2" required />
              &nbsp;&nbsp;-&nbsp;&nbsp;
              <input name="creditCard2" id="creditCard2" onChange={this.changeHolderHandler}  type="text" minLength="4" maxLength="4" className="col col-2" required />
              &nbsp;&nbsp;-&nbsp;&nbsp;
              <input name="creditCard3" id="creditCard3" onChange={this.changeHolderHandler}  type="text" minLength="4" maxLength="4" className="col col-2" required />
              &nbsp;&nbsp;-&nbsp;&nbsp;
              <input name="creditCard4" id="creditCard4" onChange={this.changeHolderHandler}  type="text" minLength="4" maxLength="4" className="col col-2" required />
            </div>

            <div className="form-group"> 
            <label htmlFor='creditMonth'>Card Expiry</label>
              <br />
              <select name="creditMonth" className="col col-3" onChange={this.changeHolderHandler}>
                {this.makeCalenderMonthsElements()}
              </select>
              &nbsp;&nbsp;-&nbsp;&nbsp;
              <select name="creditYear" className="col col-3" onChange={this.changeHolderHandler}>
                {this.makeCalenderYearsElements()}
              </select>
            </div> 

          <div className="form-group">
            <label htmlFor='cvvNo'>CVV</label>
            <input name="cvvNo" id="cvvNo" onChange={this.changeHandler}  type="password" minLength="3" maxLength="3" className="form-control" required />
          </div>

          <div className="form-group">
            <label htmlFor='billZipCode'>ZipCode</label>
            <input name="billZipCode" id="billZipCode" onChange={this.changeHandler}  type="text" minLength="5" maxLength="5" className="form-control" required />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>

        </form>
      </div>
    );

  }
}

export default FormThreeCreditCard;