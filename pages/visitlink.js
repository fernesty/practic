import React from "react";
import { useQuery } from "react-query";

const Visitlink = function(props) {
  let id = "";
  if (typeof props.id !== "undefined") {
    id = "/" + props.id;
  }
  let { data } = useQuery("todo"+props.method, async () => {
    const response = await fetch(
      "http://localhost:46969/api/notifications"+id, { method: props.method },
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
  return (<div>{data}</div>);
};

export default Visitlink;
