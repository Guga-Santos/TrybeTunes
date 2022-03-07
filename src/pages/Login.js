import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

const MINLENGTH = 3;

class Login extends Component {
  constructor() {
    super();

    this.state = {
      length: 0,
      name: '',
      disable: true,
      loading: false,
      redirect: false,
    };
  }

    handleChange = ({ target }) => {
      const { value } = target;
      this.setState({
        name: value,
        length: value.length,
      }, () => this.setState((before) => ({
        disable: before.length < MINLENGTH,
      })));
    }

    handleClick = async (e) => {
      e.preventDefault();
      const { name } = this.state;
      this.setState({ loading: true });
      await createUser({ name });
      this.setState({
        loading: false,
        redirect: true,
      });
    }

    render() {
      const { name, disable, loading, redirect } = this.state;
      return (
        loading ? <h2>Carregando...</h2>
          : (
            <div data-testid="page-login">
              <form>
                <input
                  type="text"
                  name="name-input"
                  data-testid="login-name-input"
                  className="name-input"
                  value={ name }
                  onChange={ this.handleChange }
                />
                <button
                  type="submit"
                  data-testid="login-submit-button"
                  disabled={ disable }
                  onClick={ this.handleClick }
                >
                  Entrar
                </button>
                { redirect ? <Redirect to="/search" /> : null }
              </form>
            </div>
          )
      );
    }
}

export default Login;
