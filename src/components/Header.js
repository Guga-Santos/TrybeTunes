import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: false,
      // getUser: false,
    };
  }

  componentDidMount() {
    this.onLoad();
  }

  onLoad = async () => {
    this.setState({ loading: true });
    const response = await getUser();
    this.setState({
      userName: response.name,
      loading: false,
      // getUser: true,
    });
    return response.name;
  }

  render() {
    const { userName, loading } = this.state;
    return (
      loading
        ? <Loading />
        : (
          <header data-testid="header-component">
            <h2
              data-testid="header-user-name"
            >
              {userName}
            </h2>

            <Link
              to="/search"
              data-testid="link-to-search"
              className="nav-link"
            />

            <Link
              to="/favorites"
              data-testid="link-to-favorites"
              className="nav-link"
            />

            <Link
              to="/profile"
              data-testid="link-to-profile"
              className="nav-link"
            />

          </header>
        )
    );
  }
}

export default Header;
