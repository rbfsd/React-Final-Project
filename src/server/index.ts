import {api} from "./api";
import session from 'cookie-session';
import express from "express";
import { auth } from "./auth";

const app = express();
app.use(
  session({
    secret: process.env["SESSION_SECRET"]|| "secret",
  })
)
app.use(auth)
app.use(api);
app.get("/api/hi", (_req, res) => res.send("hello"));
app.use(express.static(process.cwd() + "/dist"));
app.listen(process.env["PORT"] || 3002, () => console.log("Started"))
