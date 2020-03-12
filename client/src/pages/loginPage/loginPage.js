import React, { Component } from 'react'
import axios from "axios";
import { Redirect } from "react-router";
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import styles from "./loginPage.module.css";
import { saveToken } from "../../store/actions/auth";
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class loginPage extends Component {

    state = {
        email: "",
        password: "",
        redirect: false,
        errors: []
    }

    errorDisplay = () => {
        return (this.state.errors.map((error, i) => {
            console.log("hey there");
            return (
                <Paper id={styles.root} key={i}>
                    <Typography component="p" color="error">
                        {error}
                    </Typography>
                </Paper>)
        }))
    }

    emailOnChangeHandeler = (e) => {
        this.setState({ email: e.target.value })
    }
    passwordOnChangeHandeler = (e) => {
        this.setState({ password: e.target.value })
    }
    clickHandeler = () => {
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(userData);

        axios.post("http://localhost:5000/users/login", userData)
            .then(res => {
                if (res.data.success === true) {
                    console.log(res.data.token)
                    this.props.saveTokenToRedux(res.data.token);
                    window.localStorage.setItem("token", res.data.token);
                    const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                    window.localStorage.setItem("expiresIn", expirationDate);
                    this.setState({ redirect: true });
                } else {
                    console.log(res.data.message);
                    this.setState({ errors: [res.data.message] });
                }
            }).catch(e => {
                console.log(e);
            });
    }

    redirectHandeler = () => {
        if (this.state.redirect === true) {
            return <Redirect to="/dashboard" />
        }
    }

    registerClickHandeler = () => {
        this.props.history.push(`register`);
    }

    render() {
        return (
            <div align="center" className={styles.hero}>
                {this.redirectHandeler()}
                <div className={styles.style}>
                    <form className={styles.formstyle}>
                        <h2>Login</h2>
                        {this.errorDisplay()}
                        <FormControl>
                            <TextField
                                label="Email"
                                margin="normal"
                                fullWidth
                                onChange={this.emailOnChangeHandeler}
                            />
                            <FormHelperText id="email-helper-text">We'll never share your email.</FormHelperText>
                        </FormControl>
                        <br />
                        <FormControl>
                            <TextField
                                label="password"
                                className={styles.TextFieldStyle} type="password"
                                margin="normal"
                                fullWidth
                                onChange={this.passwordOnChangeHandeler}
                            />
                        </FormControl>
                        <br /><br />

                        <Button variant="contained" size="medium" color="primary" onClick={this.clickHandeler} id={styles.btn}>
                            Login
                            </Button>
                        <Button variant="contained" size="medium" color="primary" onClick={this.registerClickHandeler} id={styles.btn}>
                            Register
                            </Button>

                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isLoggedIn,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        saveTokenToRedux: (token ) => dispatch(saveToken(token ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(loginPage);
