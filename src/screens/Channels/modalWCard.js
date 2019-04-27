// @flow
import React, {Component} from "react";
import {TouchableHighlight} from "react-native";
import {Text, Button, View, Card, CardItem, Content, Body, Container} from "native-base";
import {Grid, Col, Row} from "react-native-easy-grid";
import styles from "./styles";

class ModalWithCard extends Component {

  render() {
    return (
         <View style={styles.modalView}>
                <Text style={styles.modalMoney}>$5,110.02</Text>
                <Text style={styles.totalPriceTxt}>Total Price</Text>
                <Text style={styles.showPaperWorkTxt}>
                SHOW PAPERWORK INFO</Text>
                <View style={{flex: 0,flexDirection: "row",
                    height: 70,
                    paddingLeft: 10,
                    marginTop: 25,
                    paddingRight: 10,
                    justifyContent: "space-between",
                    }}>
                    
                  <View style={styles.modalCard}>
                    <Text style={styles.cardTitle}>Finance Charge</Text>
                    <Text style={{ alignSelf: "center", color: "#39aa44", fontSize: 26, fontWeight: "400"}}>$5,103.21</Text>
                  </View>
                  <View style={styles.modalCard}>
                    <Text style={styles.cardTitle}>Amount Financed</Text>
                    <Text style={styles.cardBody}>$5,103.21</Text>
                  </View>
                </View>
                <View style={{flex: 0,flexDirection: "row",
                    height: 70,
                    marginTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    justifyContent: "space-between",
                    }}>
                  <View style={styles.modalCard}>
                    <Text style={styles.cardTitle}>Total of Payments</Text>
                    <Text style={styles.cardBody}>$5,103.21</Text>
                  </View>
                  <View style={styles.modalCard}>
                    <Text style={styles.cardTitle}>Total Sales Price</Text>
                    <Text style={styles.cardBody}>$5,103.21</Text>
                  </View>
                </View>
                  <Button style={styles.doneBtnModal2} 
                onPress={this.props.closeModalVisible}>
                <Text style={styles.doneTxt}>Done</Text></Button>
         
             </View>
        );
     }
    }

export default ModalWithCard;
