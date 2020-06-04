import React from 'react';

import texture1 from './assets/texture1.jpg'
import texture2 from './assets/texture2.jpg'
import texture3 from './assets/texture3.jpg'
import texture4 from './assets/texture4.jpg'

class TextureSelector extends React.Component {

    handleChange = (event) => {
        this.props.selector(event.target.value);
    }
    
    render() {
        return(
            <div className="texture-selector-box">
                <div>
                    <label>
                        <input type="radio" name="color" value={texture1} onChange={this.handleChange}/>
                        Texture1
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio" name="color" value={texture2} onChange={this.handleChange}/>
                        Texture2
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio" name="color" value={texture3} onChange={this.handleChange}/>
                        Texture3
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio" name="color" value={texture4} onChange={this.handleChange}/>
                        Texture4
                    </label>
                </div>
            </div>
        )
    }
}

export default TextureSelector;