import React, { Component } from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

const PrivateRoute = ({component: Component, auth, ...rest }) => (
    <Route
    {...rest}
    render = {props=>
    auth.isAuthenticated === true? (
        <Component {...props} />
    ) : (
        <Redirect to = "/" />
    )}
    />
);

export default connect(
    (state) => ({
        auth:state.auth
    })
)(PrivateRoute);