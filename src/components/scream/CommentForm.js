import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {
	Button, 
	Grid, 
	TextField
} from '@material-ui/core';
import {submitComment} from '../../redux/actions/dataActions';

const styles = theme => ({
	...theme.globalStyles
});

class CommentForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			body: '',
			errors: {},
			addCommentSuccess: false
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.UI.errors) {
			return {
				errors: nextProps.UI.errors
			}
		}
		if (!nextProps.UI.errors && !nextProps.UI.loading && prevState.addCommentSuccess === true) {
            return {
                body: '',
                addCommentSuccess: false
            }
        }
		return null;
	}

	handleChange = event => {
		this.setState({[event.target.name]: event.target.value});
	}

	handleSubmit = event => {
		event.preventDefault();
		this.props.submitComment(this.props.screamId, {body: this.state.body});
		this.setState({addCommentSuccess: true});
	}
	render() {
		const {classes, authenticated} = this.props;
		const errors = this.state.errors;
		const commentFormMarkup = authenticated ? (
			<Grid item sm={12} style={{textAlign: 'center'}}>
				<form onSubmit={this.handleSubmit}>
					<TextField
						name="body"
						type="text"
						label="Comment on scream"
						error={errors.comment ? true : false}
						helperText={errors.comment}
						value={this.state.body}
						onChange={this.handleChange}
						fullWidth
						className={classes.textField}
					/>
					<Button type="submit"
						variant="contained"
						color="primary"
						className={classes.button}
					>Submit</Button>
				</form>
				<hr className={classes.visibleSeparator} />
			</Grid>
		) : null;
		return commentFormMarkup;
	}
}

Comment.propTypes = {
	submitComment: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
	authenticated: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	screamId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
	UI: state.UI,
	authenticated: state.user.authenticated
});

export default connect(mapStateToProps, {submitComment})(withStyles(styles)(CommentForm));