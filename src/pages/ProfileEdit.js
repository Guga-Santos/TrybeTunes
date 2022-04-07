import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({
      loading: true,
    });

    const userInfos = await getUser();
    const { name, description, email, image } = userInfos;

    this.setState({
      loading: false,
      name,
      email,
      description,
      image,

    });
  }

  handleChange = ({ target: { id, value } }) => {
    const { name, email, description, image } = this.state;
    this.setState({
      [id]: value,
    }, () => this.setState({
      disabled: !(name && email && description && image),
    }));
  }

handleClick = async (e) => {
  e.preventDefault();
  const { history } = this.props;
  const { email, name, description, image } = this.state;
  this.setState({
    loading: true,
  });
  await updateUser({
    name,
    email,
    image,
    description,
  });
  this.setState({
    loading: false,
  });
  history.push('/profile');
}

render() {
  const {
    name,
    email,
    description,
    image,
    loading,
    disabled,
  } = this.state;

  return (
    <div data-testid="page-profile-edit">
      <Header />
      {
        loading ? <Loading />
          : (
            <>
              <p>ProfileEdit</p>
              <form action="POST">
                <label htmlFor="name">
                  Nome:
                  <input
                    type="text"
                    data-testid="edit-input-name"
                    value={ name }
                    onChange={ this.handleChange }
                    id="name"
                  />
                </label>
                <label htmlFor="email">
                  Email:
                  <input
                    type="text"
                    data-testid="edit-input-email"
                    value={ email }
                    onChange={ this.handleChange }
                    id="email"
                  />
                </label>
                <label htmlFor="description">
                  Descrição:
                  <input
                    type="text"
                    data-testid="edit-input-description"
                    value={ description }
                    onChange={ this.handleChange }
                    id="description"
                  />
                </label>
                <label htmlFor="image">
                  Imagem:
                  <input
                    type="text"
                    data-testid="edit-input-image"
                    value={ image }
                    onChange={ this.handleChange }
                    id="image"
                  />
                </label>
              </form>
              <button
                type="submit"
                data-testid="edit-button-save"
                onClick={ this.handleClick }
                disabled={ disabled }
              >
                Salvar
              </button>

            </>
          )
      }
    </div>
  );
}
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
