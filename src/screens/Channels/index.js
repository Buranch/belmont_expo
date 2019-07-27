// @flow
import React, {Component} from "react";
import {
  Container,
  Header,
  Left,
  Right,
  Button,
  Icon,
  View,
  Tabs,
  Tab,
  Content,
  Text,
  TabHeading
} from "native-base";


import TabByMonthly from "./tabByM";
import TabByTotal from "./tabByT";


class Channels extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left>
            {/* <Button
              transparent 
            onPress={() => this.props.navigation.openDrawer()
            }> */}
              {/* <Icon active name="menu" /> */}
            <Text style={{padding: 10, paddingTop: 15, fontWeight: "bold"}}>
            Calculate Payments
            </Text>
            {/* </Button> */}
          </Left>
          <Right />
        </Header>
        <View style={{flex: 1}}>
          <Tabs style={{backgroundColor: "#fff"}}>
            
            <Tab
              heading={
                <TabHeading>
                  <Text>By Total $ </Text>
                </TabHeading>
              }
            >
              <TabByTotal navigation={this.props.navigation} />
            </Tab>
            {/* <Tab
              heading={
                <TabHeading>
                  <Text>By Monthly $ </Text>
                </TabHeading>
              }
            >
              <TabByMonthly navigation={this.props.navigation} />
            </Tab> */}
          </Tabs>
        </View>
      </Container>
    );
  }
}

export default Channels;
