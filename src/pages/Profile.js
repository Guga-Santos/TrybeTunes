import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      get: '',
    };
  }

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch = async () => {
    this.setState({
      loading: true,
    });
    const get = await getUser();
    this.setState({
      loading: false,
      get,
    });
  }

  render() {
    const { loading, get } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <p>Profile</p>
        { loading ? <Loading /> : (
          <>
            <img
              src={ get.image }
              alt="imagem"
              data-testid="profile-image"
            />
            <Link to="/profile/edit">Editar perfil</Link>
            <h2>{ get.name }</h2>
            <h3>{ get.email }</h3>
            <h4>{ get.description }</h4>

          </>
        ) }
      </div>
    );
  }
}

export default Profile;
