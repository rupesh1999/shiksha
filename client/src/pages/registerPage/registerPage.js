import React, { Component } from 'react';
import {Redirect} from "react-router";
import axios from "axios";
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import styles from "./registerPage.module.css";


class registerPage extends Component {

    state = {
        email: "",
        password: "",
        redirect: false
        
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


        axios.post("http://localhost:5000/users/register", userData)
            .then(res => {
                console.log(res);
                if(res.data.success === true) {
                    this.setState({redirect:true})

                }else{

                }
            }).catch(e => {
                console.log(e);
            });
    }

    redirectHandeler = () => {
        if(this.state.redirect === true){
            console.log("redirecting");
            return <Redirect to="/login" />
        }
    }

    render() {
        return (
            <div align="center" className={styles.hero}>
            {this.redirectHandeler()}
                <div className={styles.style}>
                    <h2>Register</h2>
                    <form className={styles.formstyle}>
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
                        <FormControl>
                            <Button variant="contained" size="medium" color="primary" onClick={this.clickHandeler} className={styles.margin + " " + styles.btn}>
                                Register
                            </Button>
                        </FormControl>

                    </form>
                </div>
            </div>
        )
    }
}

export default registerPage;
