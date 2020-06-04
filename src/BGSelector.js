import React from 'react';

class BackGroundSelector extends React.Component {
    

    handleChange = (event) => {
        console.log(event.target.value);
        this.props.selector(event.target.value);
    }

    render() {
        return(
            <div className="color-selector-box">
                <div>
                    <label>
                        <input type="radio" name="color" value="red" onChange={this.handleChange}/>
                        Red
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio" name="color" value="blue" onChange={this.handleChange}/>
                        Blue
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio" name="color" value="green" onChange={this.handleChange}/>
                        Green
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio" name="color" value="yellow" onChange={this.handleChange}/>
                        yellow
                    </label>
                </div>
                
            </div>
        )
    }
}

export default BackGroundSelector;