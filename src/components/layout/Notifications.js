import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
	Menu, 
	MenuItem, 
	IconButton, 
	Tooltip, 
	Typography, 
	Badge
} from '@material-ui/core';
import {
	Notifications as NotificationsIcon, 
	Favorite as FavoriteIcon, 
	Chat as ChatIcon
} from '@material-ui/icons';
import {markNotificationsRead} from '../../redux/actions/userActions';

class Notifications extends React.Component {
	state = {
		anchorEl: null
	};
	handleOpen = event => {
		this.setState({anchorEl: event.target});
	}
	handleClose = () => {
		this.setState({anchorEl: null});
	}
	onMenuOpened = () => {
		let unreadNotificationsIds = this.props.notifications.filter(not => !not.read)
		.map(not => not.notificationId);
		this.props.markNotificationsRead(unreadNotificationsIds);
	}
	render() {
		dayjs.extend(relativeTime);
		const notifications = this.props.notifications;
		const anchorEl = this.state.anchorEl;
		let notificationsIcon;
		if (notifications && notifications.length > 0) {
			notifications.filter(not => not.read === false).length > 0
			? notificationsIcon = (
				<Badge 
					badgeContent={notifications.filter(not => not.read === false).length}
					color="secondary"
				><NotificationsIcon /></Badge>
			): (
				notificationsIcon = <NotificationsIcon />
			);
		} else {
			notificationsIcon = <NotificationsIcon />
		}
		let notificationsMarkup = 
		notifications && notifications.length > 0 ? (
			notifications.map(not => {
				const verb = not.type === 'like' ? 'liked' : 'commented on';
				const time = dayjs(not.createdAt).fromNow();
				const iconColor = not.read ? 'primary' : 'secondary';
				const icon = not.type === 'like' ? (
					<FavoriteIcon color={iconColor} style={{marginRight: 10}} />
				) : (
					<ChatIcon color={iconColor} style={{marginRight: 10}} />
				);
				return (
					<MenuItem key={not.createdAt} onClick={this.handleClose}>
						{icon}
						<Typography
							component={Link}
							color="primary"
							variant="body1"
							to={`/users/${not.recipient}/scream/${not.screamId}`}
						>{not.sender} {verb} your scream {time}</Typography>
					</MenuItem>
				)
			})
		) : (
			<MenuItem onClick={this.handleClose}>
				You have no notifications yet
			</MenuItem>
		);
		return <>
			<Tooltip placement="top" title="Notifications">
				<IconButton 
					aria-owns={anchorEl ? 'simple-menu' : undefined} 
					aria-haspopup="true"
					onClick={this.handleOpen}
				>{notificationsIcon}</IconButton>
			</Tooltip>
			<Menu 
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={this.handleClose}
				onEntered={this.onMenuOpened}
			>{notificationsMarkup}</Menu>
		</>
	}
}

Notifications.propTypes = {
	markNotificationsRead: PropTypes.func.isRequired,
	notifications: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
	notifications: state.user.notifications
});

export default connect(mapStateToProps, {markNotificationsRead})(Notifications);