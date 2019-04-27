// @flow
import React, {Component} from "react";
import {Alert, Modal, Platform} from "react-native";
import {Content, Text, Button, Item, Body, Icon, Input, View, Form, Picker, Left, Switch, Right} from "native-base";
import {Grid, Col, Row} from "react-native-easy-grid";
import { Field,reduxForm, reset } from 'redux-form';
import styles from "./styles";
import ModalResult from './modal';
import ModalWithCard from './modalWCard';


const Numeric = value =>
  value && /[^0-9 ].[^0-9]/i.test(value) ?
  "Only Number Required" :
  undefined;


const required = value => (value ? undefined : "Required");
class TabOne extends Component {

   constructor(props) {
     super(props);
     this.state = {
       term: "12,30",
      modalVisible: false,
      florida: false

     };
   }

  closeModalVisible() {
      this.setState({modalVisible: false});
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

    let days = Number(value.term.split(",")[1]);
    let apr = Number(value.rate) / 100;
    let month = Number(value.term.split(",")[0]);

    let rateFactor = Math.ceil(PMT(apr / 12, month, (1 + apr * (days - 30) / 365)) * 100000) / 100000;
    console.log("days month", days, month);
    let cashPrice = Math.ceil((Number(value.desiredAmount)/rateFactor) * 100)/100;
    console.log('cashPrimce', cashPrice)
    let tradeIn = Number(value.tradeIn) || 0;
    console.log('tradeIn', tradeIn);

    let priceAfterTradeIn = cashPrice - tradeIn;
    console.log('priceAfterTradeIn', priceAfterTradeIn)

    let salesTax = Number(value.salesTax) || 0;
    console.log('salesTax', salesTax);

    let total1 = salesTax + priceAfterTradeIn;
    console.log('total1', total1)

    let downPayment = Number(value.downPayment) || 0;
    console.log('downPayment', downPayment);
    let total2 = total1 - downPayment;
    console.log('total2', total2)

    let flContracts = this.state.florida ? 10.5 : 0;
    let amountFinanced = total2 + flContracts;

    console.log("Amount financed ", amountFinanced);
    // let rateFactor = Math.ceil(PMT(apr / 12, month, (1 + apr * (days - 30) / 365)) * 100000) / 100000;

    console.log("Total Price ", cashPrice);

    console.log('rte facator', rateFactor);
    // (0.035643 * 100000) / 100000
    let monthlyPaymentAmount = Math.ceil(rateFactor * amountFinanced * 100) / 100;

    console.log("MonthlyAmount ", monthlyPaymentAmount)


    let totalPayment = Math.ceil(monthlyPaymentAmount * month * 100) / 100;

    console.log("Total of Payment ", totalPayment)


    let financeCharged = Math.round((totalPayment - amountFinanced) * 100 ) / 100;
    console.log("Finance Charged ", financeCharged)


    let totalSalesPrice = Math.round((totalPayment - downPayment + tradeIn) * 100) / 100;

    console.log("Total Sales Price", totalSalesPrice)

    this.setState({
      modalVisible: true,
      totalSalesPrice: cashPrice,
      financeCharged,
      totalPayment,
      amountFinanced,
      monthlyPaymentAmount
    });

  }


  onValueChange(name, value) {
    console.log('onValue change', value);
    this.setState({
      [name]: value
    });
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
            onDismiss={()=> Alert.alert("onDismiss")}
            >
            {/* <ModalWithCard closeModalVisible={()=> {
              this.setState({
                modalVisible: false
              })
            }} modalVisible={this.state.modalVisible} /> */}

            <ModalResult
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
                              console.log("clearing");
                              this.props.dispatch(reset('tabone'));
                            }
                          }} modalVisible={this.state.modalVisible} />
          </Modal>
        <View style={{ opacity: this.state.modalVisible ? 0.5 : 1 }}>
          <Grid>
            <Row>
              <Col style={styles.infoDiv}>
                <Text style={styles.infoDivText}>
                Enter the monthly payment desired to calculate the total amount financed.
                </Text>
              </Col>

            </Row>
            <Row>
              <Col style={styles.cols}>
                <Text style={styles.label}>Desired Monthly Amount</Text>
                 <Field name="desiredAmount" 
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
                      <Picker.Item label="12 Months" value="3,30" />
                      <Picker.Item label="24 Months" value="6,30" />
                      <Picker.Item label="36 Months" value="12,30" />
                      <Picker.Item label="48 Months" value="18,30" />
                      <Picker.Item label="60 Months" value="24,30" />
                      <Picker.Item label="72 Months" value="30,30" />
                      <Picker.Item label="84 Months" value="36,30" />
                      <Picker.Item label="96 Months" value="48,30" />
                      <Picker.Item label="96 Months" value="60,30" />
                    </Picker>
                </Form>
              </Col>
            </Row>
            <Row>
               <Col style={styles.cols}>
                <Text style={styles.label}>Rate</Text>
                 <Field name="rate" rate
                  validate={[ Numeric, required]}
                 component={this.renderInput} />
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
                  validate={[ Numeric]}
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
            {/* <Row>
              <Col style={styles.cols}>
                <Body style={{marginTop: 10}}>
                  <Text style={{color: "#39aa44"}}>Florida Contract</Text>
                  <View style={{paddingBottom: 5, paddingTop: 5}}>
                    <Switch value={this.state.florida} onValueChange={(e) => this.setState({ florida: !this.state.florida})} />
                  </View>
                </Body>
              </Col>
            </Row> */}
            <View style={{flex: 1, alignSelf: "center", marginTop: 10, marginBottom: 10,  justifyContent: "flex-end"}}>
              <Button block 
              onPress={
                this.props.handleSubmit((value) => {
                console.log('vaule ', {...value,  term: this.state.term});      

                this.doCalculate({...value, 
                  salesTax: value.salesTax || 0, 
                  tradeIn: value.tradeIn || 0,
                  term: this.state.term});

                })                  // this.setState({
                  //   modalVisible: true
                  // });
                }
              style={{backgroundColor:"#39aa44", width: 150}}>
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
                  ()=> this.props.dispatch(reset("tabone"))
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
            </View>
          </Grid>
        </View>
      </Content>
    );
  }
}

export default reduxForm({
  form: 'tabone',
  // validate
})(TabOne);

// export default TabOne;
