// @flow
import React, {Component} from "react";
import {NavigationActions} from "react-navigation";
import {Image, ImageBackground, Platform, StatusBar} from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  Icon,
  View,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Toast
} from "native-base";
import {Field, reduxForm} from "redux-form";
import styles from "./styles";

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
class CompanyChooseForm extends Component {
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
    this.props.navigation.navigate("Walkthrough");
    return this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: "Walkthrough"})]
      })
    );
  }
  login() {
    if (this.props.valid) {
      this.props.navigation.navigate("Walkthrough");
      return this.props.navigation.dispatch(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: "Walkthrough"})]
        })
      );
    } else {
      Toast.show({
        text: "Enter Valid Username & password!",
        duration: 2500,
        position: "top",
        textStyle: {textAlign: "center"}
      });
    }
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container style={{backgroundColor: "#017c0d"}}>
        <Content contentContainerStyle={{flex: 0}}>
            <View style={styles.container}>
              <Image source={logo} style={styles.logo} />
            </View>
            <View>
                <Text style={styles.pleaseChooseText}>Please choose which company to distribute</Text>
            </View>
            <View style={{marginTop: 40, flex: 1, alignItems: "center"}}>
                <List style={{flex: 1, alignItems: "center", backgroundColor: "white", width: 310, 
                      shadowColor: '#000',
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.8,
                    shadowRadius: 5,
                    
                    }}>
                    <ListItem
                    onPress={()=> navigation.navigate("App")}
                    >
                    <Text
                    style={styles.listText}>Company One</Text>
                    </ListItem>
                    <ListItem
                    onPress={()=> navigation.navigate("App")}
                    >
                    <Text style={styles.listText}>Company Two</Text>
                    </ListItem>
                </List>
            </View>
        </Content>
      </Container>
    );
  }
}
const CompanyChoose = reduxForm({
  form: "company_choose"
})(CompanyChooseForm);
export default CompanyChoose;
