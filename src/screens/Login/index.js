import React, { Component} from "react";
import LoginForm from "./LoginForm";

// import { saveUserToken } from "./../../actions/authActions";

class Login extends Component {

    render() {
        return (
            <LoginForm
            navigation={this.props.navigation}
            onSubmit={(value)=> console.log('onSubmit', value)}
            />
        );
    }

}

export default Login;