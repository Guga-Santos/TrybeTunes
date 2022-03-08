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
            <div className="header-header">
              <p>TrybeTunes</p>
              <h2
                data-testid="header-user-name"
              >
                {userName}
              </h2>
            </div>
            <ul className="header-nav">
              <li>
                <Link
                  className="links"
                  to="/search"
                  data-testid="
                link-to-search"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  className="links"
                  to="/favorites"
                  data-testid="
                link-to-favorites"
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  className="links"
                  to="/profile"
                  data-testid="
                link-to-profile"
                >
                  Profile
                </Link>
              </li>
            </ul>

          </header>
        )
    );
  }
}

export default Header;
