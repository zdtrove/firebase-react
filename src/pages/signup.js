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
import axios from 'axios';
import {Link} from 'react-router-dom';


const styles = theme => ({
	...theme.globalStyles
})

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			handle: '',
			loading: false,
			errors: {}
		}
	}

	handleSubmit = event => {
		event.preventDefault();
		this.setState({
			loading: true
		});
		const newUserData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			handle: this.state.handle
		}
		axios.post('/signup', newUserData)
		.then(res => {
			console.log(res.data);
			localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
			this.setState({
				loading: false
			});
			this.props.history.push('/');
		})
		.catch(err => {
			this.setState({
				errors: err.response.data,
				loading: false
			});
		});
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	render() {
		const {classes} = this.props;
		const {errors, loading} = this.state;
		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<img src={AppIcon} alt="icon" className={classes.image} />
					<Typography variant="h3" className={classes.pageTitle}>
						Signup
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
						<TextField 
							id="confirmPassword" 
							name="confirmPassword" 
							type="password" 
							label="Confirm Password" 
							className={classes.textField} 
							value={this.state.confirmPassword} 
							onChange={this.handleChange} 
							helperText={errors.confirmPassword} 
							error={errors.confirmPassword ? true : false} 
							fullWidth 
						/>
						<TextField 
							id="handle" 
							name="handle" 
							type="text" 
							label="Handle" 
							className={classes.textField} 
							value={this.state.handle} 
							onChange={this.handleChange} 
							helperText={errors.handle} 
							error={errors.handle ? true : false} 
							fullWidth 
						/>
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
						<Button type="submit" variant="contained" color="primary" 
							className={classes.button} disabled={loading}>
							Signup
							{loading && (
								<CircularProgress size={30} className={classes.progress}/>
							)}
						</Button>
						<br />
						<small>Already have an account ? login <Link to="signup">here</Link></small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		)
	}
}

Signup.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup);