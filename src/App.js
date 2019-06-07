// @flow
import React, { Component } from "react";
import { createSwitchNavigator, createAppContainer, createStackNavigator } from "react-navigation";
import { Root } from "native-base";
import { connect} from "react-redux";
import Login from "./screens/Login/LoginForm";
import Walkthrough from "./screens/Walkthrough/";
// import Home from "./screens/Home/";
import Channels from "./screens/Channels";
// import Sidebar from "./screens/Sidebar";
// import Profile from "./screens/Profile/";
// import CompanyChoose from "./screens/CompanyChoose";
import AuthLoading from "./screens/InitialScreen";

// export const Drawer = createDrawerNavigator(
//   {
//     Home: { screen: Home },
//     Channels: { screen: Channels },
//     Profile: { screen: Profile },
//   },
//   {
//     initialRouteName: "Channels",
//     contentComponent: props => <Sidebar {...props} />
//   }
// );

const AuthStack = createStackNavigator({
  Login: {screen: Login},
  // CompanyChoose: { screen: CompanyChoose}
},
{
    headerMode: "none",
    initialRouteName: "Login"
}

);

// const AppStack = createStackNavigator(
//   {
//     CompanyChoose: { screen: CompanyChoose},
//     Walkthrough: { screen: Walkthrough },
//     Channels: { screen: Channels },
//     Home: { screen: Home},
//     Drawer: { screen: Drawer },
//     Profile: { screen: Profile },
//   },
//   {
//     initialRouteName: "Channels",
//     headerMode: "none"
//   }
// );

const AppStack = createStackNavigator(
  {
    // CompanyChoose: { screen: CompanyChoose},
    Walkthrough: { screen: Walkthrough },
    Channels: { screen: Channels },
    // Home: { screen: Home},
    // Drawer: { screen: Drawer },
    // Profile: { screen: Profile },
  },
  {
    initialRouteName: "Channels",
    headerMode: "none"
  }
);

const AllStack = createSwitchNavigator({
  AuthLoading: {
    screen: AuthLoading
  },
  App: AppStack,
  Auth: AuthStack
},{
  initialRouteName: "AuthLoading"
}
);

const AppContainer = createAppContainer(AllStack);

class Booter extends Component {
      constructor(props) {
        super(props);
      }
      render() {
        return (
            <Root>
              <AppContainer />
            </Root>
        );
      }
}


const mapStateToProps = state => ({
  isLoading: state.token.loading,
  token: state.token.token
});


const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(Booter);
