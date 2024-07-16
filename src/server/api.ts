import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/Tasks";
import { TaskController } from "../shared/TasksController";
import {createPostgresConnection} from "remult/postgres";


export const api = remultExpress({
  entities: [Task],
  controllers: [TaskController],
  getUser: (req) => req.session!["user"],
  dataProvider: createPostgresConnection({

    connectionString: 
      process.env["DATABASE_URL"]|| 
      "postgres;//postgres:MASTERKEY@localhost/postgres",
  }),
  ensureSchema:false
});