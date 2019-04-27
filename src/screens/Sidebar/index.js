// @flow
import React, { Component } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";

import {
  Container,
  Content,
  Text,
  Icon,
  ListItem,
  Thumbnail,
  View
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";

import styles from "./style";
// const resetAction = NavigationActions.reset({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
//   index: 0,
//   actions: [NavigationActions.navigate({ routeName: "Login" })]
// });
class SideBar extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <ImageBackground
          source={require("../../../assets/sidebar-transparent.png")}
          style={styles.background}
        >
          <Content style={styles.drawerContent}>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Channels");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-keypad-outline" />
              <Text style={styles.linkText}>Home</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Profile");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-person-outline" />
              <Text style={styles.linkText}> PROFILE</Text>
            </ListItem>
          </Content>
          <View style={styles.logoutContainer}>
            <View style={styles.logoutbtn} foregroundColor={"white"}>
              <Grid>
                <Col>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("Auth");
                      // navigation.dispatch(resetAction);
                    }}
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "transparent"
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>
                      LOG OUT
                    </Text>
                    <Text note style={{ color: "#fff" }}>
                      User User
                    </Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end" }}
                    onPress={() => {
                      navigation.navigate("Profile");
                    }}
                  >
                    <Thumbnail
                      source={require("../../../assets/Contacts/profile-placeholder.jpg")}
                      style={styles.profilePic}
                    />
                  </TouchableOpacity>
                </Col>
              </Grid>
            </View>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default SideBar;
