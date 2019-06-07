// @flow
import React, {Component} from "react";
import {Modal, TouchableHighlight, Alert, Platform, Linking} from "react-native";
import {Content, Text, Button, Item, Body, Icon, Input, View, Form, Picker, Left, Switch, Right} from "native-base";
import {Grid, Col, Row} from "react-native-easy-grid";
import { Field,reduxForm, reset } from 'redux-form';
import styles from "./styles";
import ModalResult from './modal';



const Numeric = value =>
  value && /[^0-9 ].[^0-9]/i.test(value) ?
  "Only Number Required" :
  undefined;


const required = value => (value ? undefined : "Required");

class TabTwo extends Component {
   state = {
    modalVisible: false,
    term: "12",
    rate: 15,
    day: 30,
    florida: false
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  doCalculate(value) {

    console.log(value);


    const PMT = (ir, np, pv, fv, type) => {
      var pmt, pvif;
      fv || (fv = 0);
      type || (type = 0);
      if (ir === 0)
        return -(pv + fv) / np;
      pvif = Math.pow(1 + ir, np);
      pmt = ir * pv * (pvif + fv) / (pvif - 1);

      if (type === 1)
        pmt /= (1 + ir);
      return pmt;
    }

    let days = Number(value.day);
    let apr = value.rate / 100;
    let month = Number(value.term);
    console.log("days month", days, month);
    let cashPrice = Number(value.salePrice);
    console.log('salePrice', cashPrice)
    let tradeIn = Number(value.tradeIn) || 0;
    let priceAfterTradeIn = cashPrice - tradeIn;
    console.log('priceAfterTradeIn', priceAfterTradeIn)

    let salesTax = Number(value.salesTax) || 0;
    let total1 = salesTax + priceAfterTradeIn;
    console.log('total1', total1)

    let downPayment = Number(value.downPayment) || 0;
    let total2 = total1 - downPayment;
    console.log('total2', total2)

    let flContracts = this.state.florida ? 10.5 : 0;
    let amountFinanced = total2 + flContracts;

    console.log("Amount financed ", amountFinanced);
    let rateFactor = Math.ceil(PMT(apr / 12, month, (1 + apr * (days - 30) / 365)) * 100000) / 100000;

    console.log('rte facator', rateFactor);
    // (0.035643 * 100000) / 100000
    let monthlyPaymentAmount = Math.round(rateFactor * amountFinanced * 100) / 100;


    let monthlyResult = Math.round((monthlyPaymentAmount / rateFactor) * 100) / 100;


    console.log("MonthlyAmount ", monthlyPaymentAmount)


    let totalPayment = Math.round(monthlyPaymentAmount * month * 100) / 100;

    console.log("Total of Payment ", totalPayment)


    let financeCharged = Math.round((totalPayment - amountFinanced) * 100) / 100;
    console.log("Finance Charged ", financeCharged)


    let totalSalesPrice = Math.round((totalPayment + downPayment + tradeIn) * 100 ) / 100;

    console.log("Total Sales Price", totalSalesPrice)

    this.setState({
      modalVisible: true,
      totalSalesPrice,
      financeCharged,
      totalPayment,
      amountFinanced,
      monthlyResult,
      monthlyPaymentAmount
    });

  }


    renderInput({ input, label, rate, type, meta: { touched, error, warning } }){
    var hasError= false;
    if(error !== undefined){
      hasError= true;
    }
    return ( 
      <Item error= {hasError && touched} style={styles.item}>
        {!rate && <Icon style={styles.inputIcon} active name="logo-usd" /> }
        {rate && <Text style={{color: "#39aa44", fontSize: 15}}>%</Text>}
        <Input keyboardType="numeric" style={styles.input}  placeholderTextColor="#7cb97f"  {...input} />
        {hasError && touched ? <Text style={{color: "red", fontSize: 10}}>{error}</Text> : <Text />}
      </Item>
      // <Item error= {hasError}>
      //   <Input {...input}/>
      // </Item>
    )
}


  onValueChange(name, value) {
    console.log('onValue change', value);
    this.setState({
      [name]: value
    });
  }

  closeModalVisible() {
    this.setState({modalVisible: false});
  }


  render() {
    return (
      <Content showsVerticalScrollIndicator={false}>
      <Modal
            animationType="slide"
            transparent
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
            // onDismiss={()=> Alert.alert("onDismiss")}
            >
            <ModalResult
              monthly
              monthlyPaymentAmount={this.state.monthlyPaymentAmount || 0}
              financeCharged={this.state.financeCharged || 0}
              amountFinanced={this.state.amountFinanced || 0}
              totalPayment={this.state.totalPayment || 0}
              totalSalesPrice={this.state.totalSalesPrice || 0}
            
            
            closeModalVisible={(clear)=> {
              this.setState({
                modalVisible: false
              });
              if (clear){
                console.log('clearing ');
                this.props.dispatch(reset('tabtwo'));
              }
            }} modalVisible={this.state.modalVisible} />
          </Modal>
        <View style={{ opacity: this.state.modalVisible ? 0.5 : 1 }}>
          <Grid>
            <Row>
              <Col style={styles.infoDiv}>
                <Text style={styles.infoDivText}>
                Enterr the sales price to calculate the monthly payment amount for the loan
                </Text>
              </Col>

            </Row>
            <Row>
              <Col style={styles.cols}>
                <Text style={styles.label}>Sale Price</Text>

                  <Field name="salePrice" 
                    validate={[Numeric]}
                  component={this.renderInput} />
              </Col>
            </Row>
            <Row>
              <Col style={styles.cols}>
                <Form>
                    <Text style={styles.label}>Term </Text>
                    <Picker
                      note
                      mode="dropdown"
                      style={{ width: "100%" }}
                      selectedValue={this.state.term}
                      onValueChange={(e)=>this.onValueChange('term', e)}
                    >
                      <Picker.Item label="3 Months" value="3" />
                      <Picker.Item label="6 Months" value="6" />
                      <Picker.Item label="12 Months" value="12" />
                      <Picker.Item label="18 Months" value="18" />
                      <Picker.Item label="24 Months" value="24" />
                      <Picker.Item label="30 Months" value="30" />
                      <Picker.Item label="36 Months" value="36" />
                      <Picker.Item label="48 Months" value="48" />
                      <Picker.Item label="60 Months" value="60" />
                    </Picker>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col style={styles.cols}>
                  <Form>
                      <Text style={styles.label}>Day </Text>
                      <Picker
                        note
                        mode="dropdown"
                        style={{ width: "100%" }}
                        selectedValue={this.state.term}
                        onValueChange={(e)=>this.onValueChange('day', e)}
                      >
                        <Picker.Item label="30 days" value={30} />
                        <Picker.Item label="45 days" value={45} />
                        <Picker.Item label="90 days" value={90} />
                      </Picker>
                  </Form>
                </Col>
            </Row>
            <Row>
               <Col style={styles.cols}>
                <Text style={styles.label}>Rate</Text>
                 {/* <Field name="rate" rate
                  validate={[ Numeric, required]}
                 component={this.renderInput} /> */}
                  <Picker
                    note
                    mode="dropdown"
                    style={{ width: "100%" }}
                    selectedValue={this.state.rate}
                    onValueChange={(e)=>this.onValueChange('rate', e)}
                  >
                    <Picker.Item label="15.00%" value={15} />
                    <Picker.Item label="17.00%" value={17} />
                    <Picker.Item label="18.00%" value={18} />
                    <Picker.Item label="19.00%" value={19} />
                    <Picker.Item label="20.00%" value={20} />
                    <Picker.Item label="21.00%" value={21} />
                    <Picker.Item label="21.98%" value={21.98} />
                    <Picker.Item label="21.99%" value={21.99} />
                    <Picker.Item label="22.98%" value={22.98} />
                  </Picker>
              </Col>
            </Row>
            <Row>
              <Col style={styles.cols}>
                <Text style={styles.label}>Trade In</Text>
                <Field name="tradeIn" 
                  validate={[Numeric]}
                  component={this.renderInput} />
              </Col>
            </Row>
            <Row>
              <Col style={styles.cols}>
                <Text style={styles.label}>Down Payment</Text>

                 <Field name="downPayment" 
                    validate={[Numeric]}
                  component={this.renderInput} />
              </Col>
            </Row>
            <Row>
              <Col style={styles.cols}>
                <Text style={styles.label}>Sales Tax</Text>

                 <Field name="salesTax"
                  validate={[Numeric]}
                  component={this.renderInput} />
              </Col>
            </Row>
            <View style={{flex: 1, alignSelf: "center", marginTop: 30, marginBottom: 200, justifyContent: "flex-end"}}>
              <Button
                block
                onPress={
                    this.props.handleSubmit((value) => {
                    console.log('vaule ', {...value,  term: this.state.term});      

                    this.doCalculate({...value, 
                      rate: this.state.rate,
                      salesTax: value.salesTax || 0,
                      tradeIn: value.tradeIn || 0,
                      term: this.state.term});

                    })}
              style={{backgroundColor:"#39aa44", width: 150, marginTop: 20}}>
              <Text
                 style={
                      Platform.OS === "android"
                        ? {fontSize: 16, textAlign: "center", color: "#fff"}
                        : {fontSize: 16, fontWeight: "900", color: "#fff"}
                    }
                >
              Calculate
              </Text>
              </Button>
              <Button block 
                onPress={
                    ()=> this.props.dispatch(reset("tabtwo"))
                  }
                style={{backgroundColor:"#39aa44", marginTop: 20, width: 150}}>
                <Text
                  style={
                        Platform.OS === "android"
                          ? {fontSize: 16, textAlign: "center", color: "#fff"}
                          : {fontSize: 16, fontWeight: "900", color: "#fff"}
                      }
                  >
                Clear
                </Text>
                </Button>
                <Text style={{color: "blue", textAlign: "center", marginTop: 10}}
                      onPress={() => Linking.openURL("https://belmontfinancellc.com/mobile-apps/android-privacy-policy")}>
                  Privacy Policy
                </Text>
            </View>
          </Grid>
        </View>
      </Content>
    );
  }
}


export default reduxForm({
  form: 'tabtwo',
  // validate
})(TabTwo);
