import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
	Card,
	CardContent,
	CardMedia,
	Typography
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {connect} from 'react-redux';
import {likeScream, unlikeScream} from '../redux/actions/dataActions';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import DeleteScream from './DeleteScream';

const styles = {
	card: {
		position: 'relative',
		display: 'flex',
		marginBottom: 20
	},
	image: {
		minWidth: 200
	},
	content: {
		padding: 25,
		objectFit: 'cover'
	}
}

function Scream(props) {
	const {
		classes, 
		scream: {body, createdAt, userImage, userHandle, screamId, likeCount, commentCount},
		user: {
			authenticated,
			credentials: {handle}
		}
	} = props;
	const likedScream = () => {
		if (props.user.likes && props.user.likes.find(like => like.screamId === props.scream.screamId)) {
			return true;
		} else return false;
	}
	const likeScream = () => {
		props.likeScream(props.scream.screamId);
	}
	const unlikeScream = () => {
		props.unlikeScream(props.scream.screamId);
	}
	const likeButton = !authenticated ? (
		<MyButton tip="Like">
			<Link to="/login">
				<FavoriteBorder color="primary"/>
			</Link>
		</MyButton>
	) : (
		likedScream() ? (
			<MyButton tip="undo like" onClick={unlikeScream}>
				<FavoriteIcon color="primary"/>
			</MyButton>
		) : (
			<MyButton tip="Like" onClick={likeScream}>
				<FavoriteBorder color="primary"/>
			</MyButton>
		)
	)
	dayjs.extend(relativeTime);
	const deleteButton = authenticated && userHandle === handle ? (
		<DeleteScream screamId={screamId} />
	) : null
	return (
		<Card className={classes.card}>
			<CardMedia image={userImage} title="Profile image" className={classes.image} />
			<CardContent className={classes.content}>
				<Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
					{userHandle}
				</Typography>
				<br />
				{deleteButton}
				<Typography variant="body2" color="textSecondary">
					{dayjs(createdAt).fromNow()}
				</Typography>
				<Typography variant="body1">
					{body}
				</Typography>
				{likeButton}
				<span>{likeCount} Likes</span>
				<MyButton tip="comments">
					<ChatIcon color="primary" />
				</MyButton>
				<span>{commentCount} comments</span>
			</CardContent>
		</Card>
	)
}

Scream.propTypes = {
	likeScream: PropTypes.func.isRequired,
	unlikeScream: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	scream: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	user: state.user
});

const mapActionsToProps = {
	likeScream,
	unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));