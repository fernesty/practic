import React from "react";
import General from "./general";
import { QueryClient, QueryClientProvider } from "react-query";
import Visitlink from "./visitlink";
import { Button } from "react-native";

const callVariant = {
  GET: { method: "GET" },
  POST: { method: "POST" },
  PUT: { method: "PUT", id: 12 },
  DELETE: { method: "DELETE", id: 21 },
};

const queryClient = new QueryClient();

class Test extends General {
  client() {
    this.state.connection.onopen = () => {
      setTimeout(() => {
        this.state.connection.send(JSON.stringify({ id: crypto.randomUUID(), message: "6" }));
      }, 5000);
    };
  }

  client2(msg, date) {
    this.state.connection.send(JSON.stringify({ id: crypto.randomUUID(), message: msg, date:date}));
  }

  pong() {
    setInterval(() => {
      this.state.connection.send(JSON.stringify({ id: crypto.randomUUID(), message: "Pong" }));
    }, 3000);
  }


  render() {
    // this.client();
    this.pong();
    let btn = callVariant[this.state.CurrentPage];
    return (
      <QueryClientProvider client={queryClient}>

        <h1 style={{ fontSize: 72, textAlign: "center" }}>Test</h1>
        <div style={{ backgroundColor: this.context.background, color: this.context.foreground }}>
          <input type="text" onKeyPress={(e) => {
            if (e.key === "Enter") {
              this.client2(e.target.value, document.getElementById("NotificationDate").value);
            }
          }} />
          <input type="date" id="NotificationDate" />
          <Button title="get" onPress={() => {
            this.setState({ CurrentPage: "GET" });
          }}></Button>
          <Button title="post" onPress={() => {
            this.setState({ CurrentPage: "POST" });
          }}></Button>
          <Button title="put" onPress={() => {
            this.setState({ CurrentPage: "PUT" });
          }}></Button>
          <Button title="delete" onPress={() => {
            this.setState({ CurrentPage: "DELETE" });
          }}></Button>
        </div>
        <Visitlink method={btn.method} id={btn.id} />
      </QueryClientProvider>
    );
  }

  constructor() {
    super();
    const url = "ws://localhost:36969";
    const connection = new WebSocket(url);
    this.state = { CurrentPage: "GET", connection: connection };
    this.state.connection.onerror = (error) => {
      console.log(`WebSocket error: ${error}`);
    };
    this.state.connection.onmessage = (e) => {
      console.log("e", e.data);
      let message = "";
      message = JSON.parse(e.data);

      if (message.title === "Ping") {
        console.log("OKKKKKKKK");
      } else {
        alert(message.title.toString("utf8"));
      }
    };
  }
}


export default Test;
