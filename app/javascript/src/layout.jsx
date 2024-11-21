// layout.jsx
import React from 'react';

class Layout extends React.Component {
  state = {
    currentUser: null,
  };

  componentDidMount() {
    fetch('/api/current_user')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.user) {
          console.log("Fetched user:", data.user);
          this.setState({ currentUser: data.user });
        } else {
          console.error("No user data returned from /api/current_user");
        }
      })
      .catch((error) => console.error('Error fetching current user:', error));
  }

  handleLogout = () => {
    fetch('/api/logout', {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = '/';
        } else {
          console.error('Error logging out');
        }
      })
      .catch((error) => console.error('Logout request failed:', error));
  };

  render() {
    const { currentUser } = this.state;

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand text-primary" href="/">Twitter Clone</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                {currentUser ? (
                  <>
                    <li className="nav-item">
                      <span className="nav-link">Hi, <b>{currentUser.username}</b>!</span>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/profile">Profile</a>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link btn btn-link"
                        onClick={this.handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href="/login">Login</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/signup">Sign Up</a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
        <footer className="p-3 bg-light">
          <div>
            <p className="me-3 mb-0 text-secondary">Twitter Clone</p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Layout;
