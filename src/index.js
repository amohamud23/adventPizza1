import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import MusicControls from "./MusicControls.js";
import BGSelector from './BGSelector';
import TXSelector from './TXSelector';
import Gif from './Gif';

import axios from "axios";
import Switch from '@material-ui/core/Switch';


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
      searchInput: '',
      img: null,
      gifData: [],
      bgColor: null,
      showBG: true,
      txtImg: null,
    };
  }

  handleSubmit = () => {
  
    axios.get('http://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: 'dpj1p2rktpG0tjnHWlVqReVgCKUR7BuS',
        q: this.state.searchText,
      }
    }).then(res => {
      
      this.setState({data: res.data.data});
      
      this.nextGiphy();
    })
  }

  changeBackGround = (color) => {
    this.setState({bgColor: color});
  }
  
  async nextGiphy(){
  
    
    for(let i = 0; i < this.state.data.length; i++){
      
      this.setState({img: this.state.data[i].embed_url});
      
      
      await new Promise(r => setTimeout(r, 5000));
    }
  }
  
  handleChange = (events) => {
    this.setState({searchText: events.target.value});
  }
  
  clickSwitch = () => {
    this.setState({showBG: !this.state.showBG});
    console.log(this.state.showBG);
  }
  
  changeTexture = (texture) => {
    this.setState({txtImg: texture});
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
      <div className="App" style={this.state.showBG ? {backgroundColor: this.state.bgColor} : {backgroundImage: `url(${this.state.txtImg})`, backgroundSize: '100% 100%' }}>
        <div style={titleDiv}>
          <h1>Music Player</h1>
        </div>
        <div>
          <MusicControls walletAddress={this.state.accountAddress} />
        </div>

        <div style={{position: 'absolute', right: '40px', top: '40px'}}>
          <Switch onChange={this.clickSwitch} />
          {
            this.state.showBG ?
              <BGSelector selector={(e) => { this.changeBackGround(e) }}/>
              :
              <TXSelector selector={(e) => { this.changeTexture(e)}} />
          }
        </div>

        <div style={{position: 'absolute', top: '0', left: '450px'}}>
          <div className="searchbox">
            <label>Search for Gif: </label>
            <input name="search" id="search" type="text" onChange={this.handleChange}/>
            <button onClick={this.handleSubmit}>submit</button>
            <Gif url={this.state.img}/>
          </div>
        </div>
        
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
