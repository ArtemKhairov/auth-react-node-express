import React, { Component } from 'react';
import {H1,FormBlock,FormElement,Form,Input} from './components/FormLogin'

class Login extends Component{
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/Authenticate', {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type':'application/json'
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/');
        } else {
          const error = new Error(res.error);
          throw error;
      }
      })
      .catch(err => {
        console.error(err);
        alert('Ошибочка при входе в систему,вы не проходите')
      })
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <H1>Login Below!</H1>
        <FormBlock>
          <FormElement>
          <Input
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required/>
          </FormElement>
            
          <FormElement>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
          </FormElement>
      
          <FormElement>
            <input type='submit' value="Submit"/>
          </FormElement>
        </FormBlock>
      </Form>
    )
  }
}

export default Login