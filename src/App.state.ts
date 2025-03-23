import { state } from "@react-rxjs/core";
import { createSignal, mergeWithKey } from "@react-rxjs/utils";
import { SelectItem } from "primereact/selectitem";
import { map, scan } from "rxjs";
import { v4 } from "uuid";

const [addTodo$, addTodo] = createSignal<string>();
export { addTodo };
const [removeTodo$, removeTodo] = createSignal<string>();
export { removeTodo };

const todosReducer$ = mergeWithKey({
  addTodo: addTodo$,
  removeTodo: removeTodo$,
}).pipe(
  scan((todos, action) => {
    switch (action.type) {
      case "addTodo":
        return todos.set(v4(), action.payload);

      case "removeTodo":
        todos.delete(action.payload);
        return todos;

      default:
        return todos;
    }
  }, new Map<string, string>())
);

const initialTodos: SelectItem[] = [];
export const todos$ = state(
  todosReducer$.pipe(
    map((todos) =>
      [...todos.entries()].reduce(
        (acc, [id, todo]) => [...acc, { value: id, label: todo }],
        initialTodos
      )
    )
  ),
  initialTodos
);
