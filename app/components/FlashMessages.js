import React, { useEffect } from "react";

function FlashMessages(props) {
  let cssBehavior = "success";
  if (props.behavior == "error") {
    cssBehavior = "danger";
  }
  if (props.behavior == "info") {
    cssBehavior = "info";
  }
  return (
    <div className="floating-alerts">
      {props.messages.map((msg, index) => {
        return (
          <div key={index} className={`alert alert-${cssBehavior} text-center floating-alert shadow-sm`}>
            {msg}
          </div>
        );
      })}
    </div>
  );
}

export default FlashMessages;
