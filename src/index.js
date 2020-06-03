import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MusicControls from "./MusicControls.js";
import axios from 'axios';

let ethereum = window.ethereum;
var userAddress;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        account: null
    }
  }
  componentDidMount() {
    this.getAccountName();
}

async getAccountName() {
    // eslint-disable-next-line no-undef
    this.setState({account: await ethereum.enable()}, () => {
        userAddress = this.state.account[0];
        console.log("userAddress: "+userAddress);
    });
}


  
  render() {
      return (
        <div className="container">
          <h1>Test</h1>
          <MusicControls  walletAddress={123}/>
        </div>
    );
    
    }
    


  }

ReactDOM.render(<App />, document.querySelector("#root"));
