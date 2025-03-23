import { useStateObservable } from "@react-rxjs/core";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ListBox } from "primereact/listbox";
import { FormEvent, useRef } from "react";
import styles from "./App.module.css";
import { addTodo, removeTodo, todos$ } from "./App.state";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const todos = useStateObservable(todos$);

  const handleAdd = (event: FormEvent) => {
    event.preventDefault();
    const value = inputRef.current?.value;

    if (!value) {
      return;
    }

    addTodo(value);
    inputRef.current!.value = "";
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Todo App</h1>
      <div className={styles.todosContainer}>
        <form onSubmit={handleAdd} className={styles.inputAdd}>
          <InputText ref={inputRef} />
          <Button type="submit">+</Button>
        </form>
        <ListBox
          emptyMessage="Empty list: add using the input above"
          options={todos}
          className={styles.list}
          onChange={(event) => removeTodo(event.value)}
        />
      </div>
    </div>
  );
}

export default App;
