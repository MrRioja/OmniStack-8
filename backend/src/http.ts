import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

require("dotenv").config();

import { routes } from "./routes";

const connectedUsers = {};
const mongoUrl = process.env.MONGO_URL!!;

const app = express();

const server = createServer(app);

mongoose.connect(mongoUrl);

const io = new Server(server);

io.on("connection", (socket) => {
  const { user } = socket.handshake.query;
  console.log("socket", socket.id);
  connectedUsers[user] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

export { server, io };
