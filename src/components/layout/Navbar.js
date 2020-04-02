import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
	AppBar, 
	Toolbar, 
	Button
} from '@material-ui/core';
import MyButton from '../../util/MyButton';
import HomeIcon from '@material-ui/icons/Home';
import PostScream from '../scream/PostScream';
import Notifications from './Notifications';

class Navbar extends React.Component {
 	render() {
		 const {authenticated} = this.props;
 		return (
 			<AppBar>
 				<Toolbar className="nav-container">
 					{authenticated ? (
						<>
							<PostScream />
							<Link to="/">
								<MyButton tip="Home">
									<HomeIcon />
								</MyButton>
							</Link>
							<Notifications />
						</>
					 ) : (
						 <>
							<Button color="inherit" component={Link} to="/login">Login</Button>
							<Button color="inherit" component={Link} to="/">Home</Button>
							<Button color="inherit" component={Link} to="/signup">Signup</Button>
						 </>
					 )}
 				</Toolbar>
 			</AppBar>
 		)
 	}
}

Navbar.propTypes = {
	authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
	authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);