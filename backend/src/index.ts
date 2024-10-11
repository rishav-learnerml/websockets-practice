import express from "express";
import { WebSocketServer, WebSocket } from "ws";

type Websocket = {
  on: (
    arg0: string,
    arg1: {
      (...data: any[]): void;
      (message?: any, ...optionalParams: any[]): void;
      (data: any, isBinary: any): void;
    }
  ) => void;
  send: (arg0: string) => void;
};

type Client = {
  readyState: number;
  send: (arg0: any, arg1: { binary: any }) => void;
};

const app = express();
const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(ws: Websocket) {
  ws.on("error", console.error);

  ws.on("message", function message(data: any, isBinary: any) {
    wss.clients.forEach(function each(client: Client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  // ws.send("Hello! Message From Server!!");
});
