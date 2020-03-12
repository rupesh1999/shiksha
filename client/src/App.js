import React, { Component } from "react";
import Layout from "./containers/layout/layout";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import SearchContainer from "./containers/searchContainer/searchContainer"
import Dashboard from "./pages/dashboard/dashboard";
import QuestionAdderPage from "./pages/questionAdderPage/questionAdderPage";
import LoginPage from "./pages/loginPage/loginPage"
import RegisterPage from "./pages/registerPage/registerPage";
import { connect } from "react-redux";
import { tryAutoLogin } from "./store/actions/auth";
import MathComponent from "./components/mathComponent/mathComponent";

class App extends Component {

  componentDidMount() {
    this.props.autoLogin();
    if(window.localStorage.getItem("token") == null){
      this.props.history.push("/login");
    }
  }

  render() {
    let nav = null;
    if (this.props.isAuthenticated === true) {
      console.log(this.props.isAuthenticated)
      nav = <Switch>
        <Route path="/search" exact component={SearchContainer} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/questionadder" exact component={QuestionAdderPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/math" exact component={MathComponent} />
        <Route path="/register" exact component={RegisterPage} />
        <Redirect to="/dashboard" />

      </Switch>

    } else {
      nav = <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
      </Switch>
    }
    return (
      <div>
        <Layout>
          {nav}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isLoggedIn,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch(tryAutoLogin())
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
