import React, { Component } from 'react';

class DisplayClients extends Component {

  constructor(props) {
    super(props)

    this.state = {
      clients: []
    }

    this.clientRowElements = this.clientRowElements.bind(this);
  };

  componentDidMount() {
    fetch('/clients')
      .then(rawData => rawData.json())
      .then(jsonData => {
        this.setState({
          clients: jsonData
        })
      })
      .catch(() => console.log('error getting'))
  }

  clientRowElements() {
    const clientRows = this.state.clients.map(ele => {
      return(
        <tr key={ele.id}>
          <td>{ele.id}</td>
          <td>{ele.name}</td>
          <td>{ele.city}</td>
          <td>{ele.state}</td>
          <td>{ele.email}</td>
        </tr>
      );
    });

    return clientRows;
  };


  render() {

    return(
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {this.clientRowElements()}      
        </tbody>
      </table>

    </div>
    );
    
  }

};


export default DisplayClients;