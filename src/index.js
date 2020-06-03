import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MusicControls from "./MusicControls.js";
import axios from "axios";

let ethereum = window.ethereum;
var userAddress;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
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
    this.setState({ accountAddress: userAddress });
  }

  render() {
    return (
      <div className="container">
        <h1>Test</h1>
        <MusicControls walletAddress={this.state.accountAddress} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
