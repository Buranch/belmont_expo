// @flow
import React, { Component } from "react";
import { Image,ImageBackground,Switch, TouchableOpacity, ListView } from "react-native";
import { AsyncStorage } from "react-native";
import {
  Container,
  Content,
  Text,
  Thumbnail,
  View,
  List,
  ListItem,
  Header,
  Left,
  Right,
  Button,
  Icon
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import CustomHeader from "../../components/CustomHeader";

import styles from "./styles";
import datas from "./data";
import { connect } from "react-redux";

type Props = {
  navigation: () => void
};
class Profile extends Component {
  state: {
    listViewData: any
  };
  props: Props;
  ds: Object;
  constructor(props: Props) {
    console.log("Alright buddy you are on profile");
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      listViewData: datas
    };
    // this._bootstrapUserToken();
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  deleteRow(secId: string, rowId: string, rowMap: any) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <ImageBackground
          source={require("../../../assets/bg-transparent.png")}
          style={styles.container}
        >
          <Header hasTabs={this.props.hasTabs}>
            <Left>
              <Button transparent onPress={() => navigation.openDrawer()}>
                <Icon active name="menu" />
              <Text style={{padding: 10, paddingTop: 15, fontWeight: "bold"}}>Profile</Text>
              </Button>
            </Left>
            <Right />
          </Header>
          <View style={styles.profileInfoContainer}>
            <View style={{ alignSelf: "center" }}>
              <Thumbnail
                source={require("../../../assets/Contacts/profile-placeholder.jpg")}
                style={styles.profilePic}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileUser}>{this.props.user.name || "No Name Available"}</Text>
              <Text note style={styles.profileUserInfo}>
                { this.props.user.email || "No email stored"}
              </Text>
            </View>
            <View>
              <Text style={{textAlign: "center", fontSize: 25, fontWeight: "bold"}}>
                Company Name
              </Text>
            </View>
          </View>
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#fff" }}
          >
            <View style={{alignItems: "center", marginTop: 20, paddingLeft: 20}}>
              <Button onPress={this._signOutAsync} style={{backgroundColor:"#fff"}}><Text style={{color: "#39aa44"}}>Log out</Text></Button>
            </View>
            <View style={{flex: 1, flexDirection: "row", padding: 20, justifyContent: 'space-between'}}>
              <Text style={{color: "#39aa44"}}>Keep me logged</Text>
              <Switch value />
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

// export default Profile;

const mapStateToProps = state => ({
  user: state.token.token
});


const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps)(Profile);