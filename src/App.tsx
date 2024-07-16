import { FormEvent, useEffect, useState } from "react";
import { remult } from "remult";
import { Task } from "./shared/Tasks";
import { TaskController } from "./shared/TasksController";

const taskRepo = remult.repo(Task);

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    return taskRepo
      .liveQuery({
        where: {
          completed: undefined,
        },
      })
      .subscribe((info) => setTasks(info.applyChanges));
  }, []);

  const addTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newTask = await taskRepo.insert({ title: newTaskTitle });
      setNewTaskTitle("");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const setAllCompleted = async (completed: boolean) => {
    await TaskController.setAllCompleted(completed);
  };

  const setAllUncompleted = async (completed: boolean) => {
    await TaskController.setAllCompleted(completed);
  };

  return (
    <div>
      <h1>TODOS</h1>
      <main>
        {taskRepo.metadata.apiInsertAllowed()&& (
          <form onSubmit={(e) => addTask(e)}>
          <input
            value={newTaskTitle}
            placeholder="what needs to be done?"
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button>Add</button>
        </form>
        )}
        {tasks.map((task) => {
          async function deleteTask() {
            try {
              await taskRepo.delete(task);
              setTasks((tasks) => tasks.filter((t) => t !== task));
            } catch (error: any) {
              alert(error.message);
            }
          }

          function setTask(value: Task) {
            setTasks((tasks) => tasks.map((t) => (t === task ? value : t)));
          }

          async function setCompleted(completed: boolean) {
            setTask(await taskRepo.save({ ...task, completed }));
          }

          function setTitle(title: string) {
            setTask({ ...task, title });
          }

          async function doSaveTask() {
            try {
              setTask(await taskRepo.save(task));
            } catch (error: any) {
              alert(error.message);
            }
          }

          return (
            <div key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              <input
                value={task.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button onClick={doSaveTask}>Save</button>
              {taskRepo.metadata.apiDeleteAllowed()&&(<button onClick={deleteTask}>Delete</button>)}
            </div>
          );
        })}
        <div>
          <button onClick={() => setAllCompleted(true)}>Set all completed</button>
          <button onClick={() => setAllUncompleted(false)}>Set all uncompleted</button>
        </div>
      </main>
    </div>
  );
}

export default App;
