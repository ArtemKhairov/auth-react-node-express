import React, { Component } from 'react';
import {DivCenter} from "./components/FormLogin"

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading home page...'
    }
  }


  componentDidMount() {
    // Получаем сообщение от сервера используя fetch
    fetch('/api/home')
      .then(res => res.text())
      .then(res => this.setState({ message: res }));
  }

  render() {
    return (
      <DivCenter>
        <h1>Home</h1>
        <p>{this.state.message}</p>
      </DivCenter>
    );
  }
}