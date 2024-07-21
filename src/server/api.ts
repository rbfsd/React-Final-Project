// api.ts

import express from "express"
import { remultExpress } from "remult/remult-express"
import { JsonDataProvider } from "remult"
import { JsonEntityFileStorage } from "remult/server"

const app = express()

app.use(
  remultExpress({
    dataProvider: async () =>
      new JsonDataProvider(new JsonEntityFileStorage("./db"))
  })
)