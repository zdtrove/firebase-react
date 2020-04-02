import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Grid, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';

const styles = theme => ({
	...theme.globalStyles,
	commentImage: {
		maxWidth: '100%',
		height: 100,
		objectFit: 'cover',
		borderRadius: '50%',
		marginLeft: 40
	},
	commentData: {
		marginLeft: 60
	}
});

class Comments extends React.Component {
	render() {
		const {comments, classes} = this.props;
		return (
			<Grid container>
				{comments.map((comment, index) => {
					const {body, createdAt, userImage, userHandle} = comment;
					return <Fragment key={index}>
						<Grid item sm={12}>
							<Grid container>
								<Grid item sm={2}>
									<img src={userImage} alt="comment" className={classes.commentImage} />
								</Grid>
								<Grid item sm={9}>
									<div className={classes.commentData}>
										<Typography
											variant="h5"
											component={Link}
											to={`/users/${userHandle}`}
											color="primary"
										>
											{userHandle}
										</Typography>
										<Typography variant="body2" color="textSecondary">
											{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
										</Typography>
										<hr className={classes.invisibleSeparator} />
										<Typography variant="body1">{body}</Typography>
									</div>
								</Grid>
							</Grid>
						</Grid>
						{index !== comments.length - 1 && (
							<hr className={classes.visibleSeparator} />
						)}
					</Fragment>
				})}
			</Grid>
		)
	}
}

Comments.propTypes = {
	comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments);