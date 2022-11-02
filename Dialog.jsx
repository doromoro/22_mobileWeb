import React from "react";


function Dialog(props) {
  const {children,backgroundColor,title,checkbox} = props;

  return (
    <div
      style={{
        margin:8,
        padding:8,
        borderRadius:8,
        boxShadow:"0px 0px 4px grey",
        backgroundColor : backgroundColor || "yellow",
      }}>
        {<h1>{title}</h1>}
        {children}
        <div
          style={{
            display:"inline-block",
            padding:"0px 20px",
            
          }}>
            {checkbox && <label><input type="checkbox"/>{checkbox}</label>}
        </div>
    </div>
  );
}

export default Dialog;