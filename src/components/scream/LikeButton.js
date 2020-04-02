import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
	Favorite as FavoriteIcon,
	FavoriteBorder
} from '@material-ui/icons';
import MyButton from '../../util/MyButton';
import {likeScream, unlikeScream} from '../../redux/actions/dataActions';

class LikeButton extends Component {
	likedScream = () => {
		if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId)) {
			return true;
		} else return false;
	}
	likeScream = () => {
		this.props.likeScream(this.props.screamId);
	}
	unlikeScream = () => {
		this.props.unlikeScream(this.props.screamId);
	}
	render() {
		const {authenticated} = this.props.user;
		const likeButton = !authenticated ? (
			<MyButton tip="Like">
				<Link to="/login">
					<FavoriteBorder color="primary"/>
				</Link>
			</MyButton>
		) : (
			this.likedScream() ? (
				<MyButton tip="undo like" onClick={this.unlikeScream}>
					<FavoriteIcon color="primary"/>
				</MyButton>
			) : (
				<MyButton tip="Like" onClick={this.likeScream}>
					<FavoriteBorder color="primary"/>
				</MyButton>
			)
		);
		return likeButton;
	}
}

LikeButton.propTypes = {
	user: PropTypes.object.isRequired,
	screamId: PropTypes.string.isRequired,
	likeScream: PropTypes.func.isRequired,
	unlikeScream: PropTypes.func.isRequired
}

const mapStateToProp = state => ({
	user: state.user
});

const mapActionsToProps = {
	likeScream,
	unlikeScream
};

export default connect(mapStateToProp, mapActionsToProps)(LikeButton);