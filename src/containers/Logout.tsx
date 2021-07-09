import React, { Component } from "react";

type AcceptedProps = {clearToken: () => 
void
}

const Logout: React.FunctionComponent<AcceptedProps> = (props) => {

return(
    <div>
    <button onClick = {props.clearToken}></button>
    </div>
)
}

export default Logout;
    
