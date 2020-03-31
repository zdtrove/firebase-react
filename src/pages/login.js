import React from 'react';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import {withStyles} from '@material-ui/core/styles';
import {
	Grid, 
	Typography, 
	TextField,
	Button,
	CircularProgress
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';


const styles = theme => ({
	...theme.globalStyles
});

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {}
		}
	}

	static getDerivedStateFromProps(nextProps, prevState){
	   	if(nextProps.UI.errors){
	     	return { errors: nextProps.UI.errors};
	  	} else return null;
	}

	handleSubmit = event => {
		event.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password
		}
		this.props.loginUser(userData, this.props.history);
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	render() {
		const {classes, UI: {loading}} = this.props;
		const {errors} = this.state;
		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<img src={AppIcon} alt="icon" className={classes.image} />
					<Typography variant="h3" className={classes.pageTitle}>
						Login
					</Typography>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField 
							id="email" 
							name="email" 
							type="email" 
							label="Email" 
							className={classes.textField} 
							value={this.state.email} 
							onChange={this.handleChange} 
							helperText={errors.email} 
							error={errors.email ? true : false} 
							fullWidth 
						/>
						<TextField 
							id="password" 
							name="password" 
							type="password" 
							label="Password" 
							className={classes.textField} 
							value={this.state.password} 
							onChange={this.handleChange} 
							helperText={errors.password} 
							error={errors.password ? true : false} 
							fullWidth 
						/>
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
						<Button type="submit" variant="contained" color="primary" 
							className={classes.button} disabled={loading}>
							Login
							{loading && (
								<CircularProgress size={30} className={classes.progress}/>
							)}
						</Button>
						<br />
						<small>don't have an account ? sing up <Link to="signup">here</Link></small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		)
	}
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	user: state.user,
	UI: state.UI
});

const mapActionsToProps = {
	loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));