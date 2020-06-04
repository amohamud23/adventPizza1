import React from 'react';

function Gif(props) {
    
    return(
        <div>
            <embed style={{marginTop: '50px'}} src={props.url} key={props.url}  />
        </div>
    )
}
export default Gif;