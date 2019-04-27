import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { connect} from "react-redux";
import { _storeData, _retrieveData, saveToken } from "./../../actions/authActions";

import {
    Container,
    Text,
    View} from "native-base";

class Init extends Component {
    constructor(props) {
        super(props);
        // _retrieveData(props.dispatch);
        // this._bootstrapAsync();
        this.props.navigation.navigate("App");

        // this.props.navigation.navigate("Auth");

    }

    _bootstrapAsync = async () => {

        const value = await AsyncStorage.getItem("userToken");
        console.log(value);
        // console.log(JSON.parse(value).email);
        // this.props.navigation.navigate( value ? "App" : "Auth");
        if (!value){
            this.props.navigation.navigate("Auth");
        } else {
            this.props.navigation.navigate("App");
            this.props.dispatch(saveToken(
                {
                    email: JSON.parse(value).email,
                    name: JSON.parse(value).email.substring(0, JSON.parse(value).email.indexOf("@"))
                }
            ));
        }
    }



    

    render() {
        const { isLoading, token } = this.props;
        console.log("TOKEN", token);
        console.log("is Loading ", isLoading);

        return (
            <Container>
                <View style={{flex: 1, alignItems: "center", justifyContent: "space-between"}}>
                    <Text style={{color: "#000", alignSelf: "center"}}>Loading</Text>
                   
                </View>
            </Container>
            // <Login />
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
)(Init);
