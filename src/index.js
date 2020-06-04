import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MusicControls from "./MusicControls.js";
import axios from "axios";

const titleDiv = {
  textAlign: "center",
  fontFamily: "Impact, Charcoal, sans-serif",
  color: "white",
  fontSize: "25px",
};

let ethereum = window.ethereum;
var userAddress;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "", // set accountAddress to "" state for now
    };
  }
  componentDidMount() {
    this.getAccountName();
  }

  async getAccountName() {
    // eslint-disable-next-line no-undef
    const accountInfo = await ethereum.enable();
    userAddress = accountInfo[0];
    console.log("userAddress: " + userAddress);
    this.setState({ accountAddress: userAddress }); // set accountAddress state to user's address
  }

  render() {
    return (
      <div>
        <div style={titleDiv}>
          <h1>Music Player</h1>
        </div>
        <div>
          <MusicControls walletAddress={this.state.accountAddress} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
