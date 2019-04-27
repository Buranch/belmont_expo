// @flow
import React, {Component} from "react";
import {Image, ImageBackground, Platform, StatusBar} from "react-native";
import { connect} from 'react-redux';

import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  Icon,
  View,
  Body,
  Toast
} from "native-base";
import {Field, reduxForm} from "redux-form";
import styles from "./styles";
import { saveUserToken, _storeData, _retrieveData, saveToken } from "./../../actions/authActions";


const bg = require("../../../assets/bg_green.png");
const logo = require("../../../assets/logo-belmont-finance.png");
// const logo = require("../../../assets/logo.png");

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(8);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

declare type Any = any;
class LoginForm extends Component {
  textInput: Any;
  renderInput({input, label, type, meta: {touched, error, warning}}) {
    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Icon
            active
            name={input.name === "email" ? "mail" : "unlock"}
            style={{color: "#fff"}}
          />
          <Input
            ref={c => (this.textInput = c)}
            placeholderTextColor="#FFF"
            style={styles.input}
            placeholder={input.name === "email" ? "Email" : "Password"}
            secureTextEntry={input.name === "password" ? true : false}
            {...input}
          />
          {touched && error
            ? <Icon
                active
                style={styles.formErrorIcon}
                onPress={() => this.textInput._root.clear()}
                name="close"
              />
            : <Text />}
        </Item>
        {touched && error
          ? <Text style={styles.formErrorText1}>
              {error}
            </Text>
          : <Text style={styles.formErrorText2}>error here</Text>}
      </View>
    );
  }
  skip() {
    this.props.navigation.navigate("CompanyChoose");
    // return this.props.navigation.dispatch(
    //   NavigationActions.reset({
    //     index: 0,
    //     actions: [NavigationActions.navigate({routeName: "Walkthrough"})]
    //   })
    // );                         
  }
  login() {
    
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={bg} style={styles.background}>
          <Content contentContainerStyle={{flex: 1}}>
            <View style={styles.container}>
              <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.container}>
              <View style={styles.form}>
                <Field
                  name="email"
                  value="biruk@gmail.com"
                  component={this.renderInput}
                  type="email"
                  validate={[email, required]}
                />
                <Field
                  name="password"
                  component={this.renderInput}
                  type="password"
                  validate={[alphaNumeric, minLength8, maxLength15, required]}
                />

                <Button
                  rounded
                  // primary
                  block
                  large
                  style={styles.loginBtn}
                  onPress={this.props.handleSubmit((value)=> {
                    console.log('logi clicked');
                    console.log(this.props.dispatch);
                    _storeData(value, this.props.dispatch);
                    this.props.dispatch(saveToken({
                      email: value.email,
                      name: value.email.substring(0, value.email.indexOf("@"))
                    }));
                    this.props.navigation.navigate("CompanyChoose");
                    // this.props.navigation.navigate("App");
                  })}
                >
                  <Text
                    style={
                      Platform.OS === "android"
                        ? {fontSize: 16, textAlign: "center"}
                        : {fontSize: 16, fontWeight: "900"}
                    }
                  >
                    Login
                  </Text>
                </Button>
                <View style={styles.otherLinksContainer}>
                  <Body>
                    <Button
                      small
                      transparent
                      style={{alignSelf: "center"}}
                      onPress={() => 
                        navigation.navigate("Drawer")
                      }
                    >
                      <Text style={styles.helpBtns}>Calculate Payment without Login</Text>
                    </Button>
                  </Body>
                </View>
              </View>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  dispatch
});
const L = connect(
  mapStateToProps, mapDispatchToProps
)(LoginForm);

const Login = reduxForm({
  form: "login"
})(L);
export default Login;
