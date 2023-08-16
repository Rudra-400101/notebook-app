import React from "react";

export default function Alert(props) {
  return (
    <>
      <div
        className={`alert alert-${props.alert.type} ${props.alert.display} position-sticky top-0`}
        role="alert"
      >
        {props.alert.type} : {props.alert.messege}
      </div>
    </>
  );
}
