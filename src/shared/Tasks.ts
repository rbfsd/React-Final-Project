import { Allow, Entity, Fields } from "remult";

@Entity("tasks", {
  allowApiCrud: Allow.authenticated,
  allowApiDelete:"admin",
  allowApiUpdate:"admin",
})
export class Task {
  @Fields.autoIncrement()
  id: number = 0;

  @Fields.string({
    validate: (task) => {
      if (task.title.length < 3) throw new Error("Too short");
    },
  })
  title: string = "";

  @Fields.boolean()
  completed: boolean = false;
}
