import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Alert, Button, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Label } from 'reactstrap';
import Widget from '../../components/Widget';
import { sendPasswordResetEmail, resetPasswordError } from '../../actions/resetpassword';
import microsoft from '../../assets/microsoft.png';
import Login from '../login';

class ResetPassword extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            email: ''
        };

        this.doResetPassword = this.doResetPassword.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.isEmailValid = this.isEmailValid.bind(this);
    }

    changeEmail(event) {
        this.setState({email: event.target.value});
    }

    checkEmail(){
        if (!this.isEmailValid()){
            setTimeout(() => {
                this.props.dispatch(resetPasswordError());
            }, 3 * 1000)
        }
    }

    isEmailValid(){
        return true;
    }

    doResetPassword(e) {
        e.preventDefault();
        if (!this.isEmailValid()) {
            this.checkEmail();
        } else {
            this.props.dispatch(sendPasswordResetEmail({
                creds: {
                    email: this.state.email,
                },
                history: this.props.history
            }));
        }
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/app'}}; // eslint-disable-line

        // cant access login page while logged in
        if (Login.isAuthenticated(JSON.parse(localStorage.getItem('authenticated')))) {
            return (
                <Redirect to={from}/>
            );
        }

        return (
            <div className="auth-page">
                <Container>
                    <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Forgot Your Password</h3>}>
                        <p className="widget-auth-info">
                            Please enter your email to continue.
                        </p>
                        <form onSubmit={this.doResetPassword}>
                                {
                                    this.props.errorMessage && (
                                        <Alert className="alert-sm widget-middle-overflow rounded-0" color="danger">
                                            {this.props.errorMessage}
                                        </Alert>
                                    )
                                }
                                <FormGroup className="mt">
                                    <Label for="email">Email Address</Label>
                                    <InputGroup className="input-group-no-border">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="la la-user text-white"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input id="email" className="input-transparent pl-3" value={this.state.email}
                                            onChange={this.changeEmail} type="email"
                                            required name="email" placeholder="Email"/>
                                    </InputGroup>
                                </FormGroup>
                                
                                <div className="bg-widget-transparent auth-widget-footer">
                                    <Button type="submit" color="danger" className="auth-btn"
                                            size="sm" style={{color: '#fff'}}>{this.props.isFetching ? 'Loading...' : 'Send Password Reset Email'}</Button>
                                    <p className="widget-auth-info mt-4">
                                        Already have the account?
                                    </p>
                                    <Link className="d-block text-center mb-4" to="login">Log In Here</Link>
                                    <div className="social-buttons">
                                        <Button color="primary" className="social-button">
                                            <i className="social-icon social-google"/>
                                            <p className="social-text">Google</p>
                                        </Button>
                                        <Button color="success" className="social-button">
                                            <i className="social-icon social-microsoft"
                                            style={{backgroundImage: `url(${microsoft})`}}/>
                                            <p className="social-text" style={{color: '#fff'}}>Microsoft</p>
                                        </Button>
                                    </div>
                                </div>
                            </form>
                    </Widget>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.resetPassword.isFetching,
        errorMessage: state.resetPassword.errorMessage,
    };
}

export default withRouter(connect(mapStateToProps)(ResetPassword));