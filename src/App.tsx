import React, { Fragment, useState, useReducer } from "react";
import { Button, TextField } from "@material-ui/core";

type FormElem = React.FormEvent<HTMLFormElement>;
interface ITodo {
  text: string;
  complete: boolean;
}

interface State {
  count: number;
}
const initialState: State = {
  count: 0
};

type Actions = "reset" | "increment" | "decrement";
interface Action {
  type: Actions;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

function App(): JSX.Element {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (event: FormElem) => {
    event.preventDefault();
    setValue("");
    addTodo(value);
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-required"
          type="text"
          required
          value={value}
          onChange={e => setValue(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="secondary" type="submit">
          Add Todo
        </Button>
      </form>
      <section>
        {todos.map((todo: ITodo, index: number) => (
          <Fragment key={index}>
            <div
              style={{ textDecoration: todo.complete ? "line-through" : "" }}
            >
              {todo.text}
            </div>
            <Button variant="outlined" onClick={() => completeTodo(index)}>
              {todo.complete ? "Incomplete" : "Complete"}
            </Button>
            <Button variant="outlined" onClick={() => removeTodo(index)}>
              x
            </Button>
          </Fragment>
        ))}
      </section>
      <div className="counter">
        <p>Clicked Count = {state.count} </p>
        <Button
          variant="outlined"
          onClick={() => dispatch({ type: "increment" })}
        >
          +
        </Button>
        <Button
          variant="outlined"
          onClick={() => dispatch({ type: "decrement" })}
        >
          -
        </Button>
        <Button variant="outlined" onClick={() => dispatch({ type: "reset" })}>
          Reset
        </Button>
      </div>
    </Fragment>
  );
}

export default App;
