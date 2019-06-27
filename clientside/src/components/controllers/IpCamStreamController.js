import { WebSocket } from "ws";

client = new WebSocket('ws://localhost:9999')
player = new jsmpeg(client, {
    canvas: canvas // Canvas should be a canvas DOM element
  })