import React, { Component } from 'react';
import { DivCenter } from "./components/FormLogin"

export default class Secret extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading some secrets...'
    }
  }


  componentDidMount() {
    // Получаем сообщение от сервера используя fetch
    fetch('/api/secret')
      .then(res => res.text())
      .then(res => this.setState({ message: res }));
  }

  render() {
    return (
      <DivCenter>
        <h1>Secret</h1>
        <p>{this.state.message}</p>
      </DivCenter>
    );
  }
}