import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    CircularProgress, 
    TextField
} from '@material-ui/core';
import {
    Add as AddIcon,
    Close as CloseIcon
} from '@material-ui/icons';
import {postScream, clearErrors} from '../../redux/actions/dataActions';
import MyButton from '../../util/MyButton';

const styles = theme => ({
    ...theme.globalStyles,
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '6%'
    }
});

class PostScream extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            body: '',
            errors: {},
            postSuccess: false
        }
    }
    handleOpen = () => {
        this.setState({open: true});
    }
    handleClose = () => {
        this.props.clearErrors();
        this.setState({open: false, errors: {}});
    }
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit = event => {
        event.preventDefault();
        this.props.postScream({body: this.state.body});
        this.setState({postSuccess: true});
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.UI.errors) {
            return {
                errors: nextProps.UI.errors
            };
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading && prevState.postSuccess === true) {
            return {
                body: '', 
                open: false, 
                errors: {},
                postSuccess: false
            }
        }
        return null;
    }
    render() {
        const {errors} = this.state;
        const {classes, UI: {loading}} = this.props;
        return <>
            <MyButton onClick={this.handleOpen} tip="Post a Scream">
                <AddIcon color="primary" />
            </MyButton>
            <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon />
                </MyButton>
                <DialogTitle>Post a new scream</DialogTitle>
                <DialogContent>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="body"
                            type="text"
                            label="SCREAM"
                            multiline
                            rows="3"
                            placeholder="Scream at your fellow apes"
                            error={errors.body ? true : false}
                            helperText={errors.body}
                            className={classes.TextField}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <DialogActions>
                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                Submit
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner} />
                                )}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    UI: state.UI
});

export default connect(mapStateToProps, {postScream, clearErrors})(withStyles(styles)(PostScream));