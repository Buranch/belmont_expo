const React = require("react-native");
const {
  Dimensions,
  Platform
} = React;

const primary = require("../../theme/variables/commonColor").brandPrimary;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  container: {
    flex: 1,
    width: null,
    height: null
  },
  bgHead: {
    backgroundColor: primary,
    flex: 1
  },
  imageHeader: {
    height: 25,
    width: 95,
    resizeMode: "contain"
  },
  channelBtn1: {
    borderWidth: 1,
    borderColor: Platform.OS === "android" ? "#ddd" : "rgba(255,255,255,0.5)"
  },
  na: {},
  channelImg: {
    height: deviceHeight / 4 + 10,
    width: deviceWidth / 2 + 2
  },
  ioschannelImgText: {
    fontSize: 12,
    fontWeight: "900",
    padding: 20,
    paddingLeft: 0,
    paddingBottom: 0,
    marginBottom: 0,
    marginLeft: 20,
    marginTop: deviceHeight / 6 + 10
  },
  achannelImgText: {
    fontSize: 12,
    fontWeight: "900",
    marginLeft: 20,
    marginTop: deviceHeight / 4 - 20
  },
  infoDiv: {
    backgroundColor: "#c6fccb87"
  },
  infoDivText: {
    padding: 15,
    fontWeight: "600",
    color: primary
  },
  cols: {
    paddingLeft: 15,
    marginTop: 10,
    width: "100%"
  },
  label: {
    color: primary,
    padding: 2,
    paddingBottom: 0,
    paddingTop: 5,
    // margin: 0
  },
  inputIcon: {
    color: "#7cb97f",
    fontSize: 15
  },
  input: {
    color: primary
  },
  item: {
    padding: 0,
    margin: 0, 
    marginTop: -10
  },
  modalMoney: {
    color: "#39aa44",
    fontSize: 35,
    marginBottom: 5,
    fontWeight: "300",
    textAlign: "center"
  },
  totalPriceTxt: {
    color: "#b4b7b9", textAlign: "center"
  }, 
  showPaperWorkTxt: {
    color: "#39aa44",
    textAlign: "center",
    marginTop: 15,
    fontSize: 19,
    fontWeight: "800"
  },
  doneBtn: {
    alignSelf: "center",
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 110,
    justifyContent: "flex-end"
  },
  doneBtnModal2: {
    alignSelf: "center",
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 30,
    // justifyContent: "flex-end"
  },
  doneTxt: {
    color: "white",
    textAlign: "center",
    alignSelf: "center"
  },
  recalculateWrapper: {
    alignSelf: "center",
    marginTop: 10
  },
  recalculateTxt: {
    color: "#39aa44",
    fontSize: 17,
    fontWeight: "600"
  },
  modalView: {
    shadowColor: "#000000",
    elevation: 1,
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 0
    },
    marginTop: 130,
    // padding: 50,

    backgroundColor: "white",
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 50,
    paddingBottom: 50

    // height: deviceHeight / 2
  },
  modalCard: {
    flex: 0.48,
    backgroundColor: "#cfead43d",
    shadowColor: "#222",
    elevation: 0.7,
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {
      height: 3,
      width: 2
    },
  },
  cardTitle: {
    marginLeft: 10,
    marginTop: 5,
    color: "#39aa44" },
    cardBody: { alignSelf: "center",
    color: "#39aa44",
    fontSize: 26,
    fontWeight: "400" }
};
