import { useState } from "react";
import {
  LuPenSquare,
  LuPlusCircle,
  LuTrash2,
  LuSendHorizonal,
} from "react-icons/lu";

function App() {
  const schemaTodo = { title: "", complete: false, subTodo: [] };
  const schemaSubTodo = { title: "", complete: false };

  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);

  const addTodo = () => {
    if (text) {
      const newTodo = [...todo, { ...schemaTodo, title: text }];
      setTodo(newTodo);
      setText("");
    }
  };

  const addSubTodo = (indexTodo) => {
    if (text) {
      const newTodo = [...todo];
      newTodo[indexTodo].subTodo.push({ ...schemaSubTodo, title: text });
      setTodo(newTodo);
      setText("");
    }
  };

  const checkboxTodo = (index) => {
    const newTodo = [...todo];
    newTodo[index].complete = !newTodo[index].complete;
    if (newTodo[index].complete === true) {
      newTodo[index].subTodo.forEach((sub) => (sub.complete = true));
    } else {
      newTodo[index].subTodo.forEach((sub) => (sub.complete = false));
    }
    setTodo(newTodo);
  };

  let checkCount = 0;
  const checkboxSubTodo = (indexTodo, indexSub) => {
    const newTodo = [...todo];
    newTodo[indexTodo].subTodo[indexSub].complete =
      !newTodo[indexTodo].subTodo[indexSub].complete;
    for (let i = 0; i < newTodo[indexTodo].subTodo.length; i++) {
      if (newTodo[indexTodo].subTodo[i].complete === true) {
        checkCount++;
      }
    }

    if (checkCount === newTodo[indexTodo].subTodo.length) {
      newTodo[indexTodo].complete = true;
    } else {
      newTodo[indexTodo].complete = false;
    }

    setTodo(newTodo);
  };

  const removeTodo = (index) => {
    const newTodo = todo.filter((value, indexTodo) => index !== indexTodo);
    setTodo(newTodo);
  };

  const removeSubTodo = (indexTodo, indexSub) => {
    const newTodo = [...todo];
    newTodo[indexTodo].subTodo = newTodo[indexTodo].subTodo.filter(
      (value, index) => index !== indexSub
    );
    setTodo(newTodo);
  };

  const updateTodo = (index) => {
    const newTodo = [...todo];
    newTodo[index].title = text;
    setTodo(newTodo);
  };

  const updateSubTodo = (indexTodo, indexSub) => {
    const newTodo = [...todo];
    newTodo[indexTodo].subTodo[indexSub].title = text;
    setTodo(newTodo);
  };

  return (
    <>
      <div className="bg-gradient-to-bl from-violet-400 to-fuchsia-300 h-[100dvh] flex justify-center items-center">
        <div className="bg-white shadow-xl m-10 min-w-[400px] w-1/3 flex flex-col items-center rounded-xl">
          <header className="flex flex-col items-center w-full">
            <h1 className="text-3xl mt-6 font-semibold text-gray-600">
              Things to do
            </h1>
            <label htmlFor="text" className="flex gap-4 relative mt-6 w-full justify-center items-center">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="outline-none rounded-full px-4 py-2 border-2 pr-12 min-w-1/5 w-3/5"
              />
              <button
                className="p-1 absolute right-[22%] top-[25%]"
                onClick={() => addTodo()}
              >
                <LuSendHorizonal color="gray" />
              </button>
            </label>
          </header>
          <main className="my-10 flex flex-col gap-4 px-10">
            {todo.map((todo, index) => (
              <div>
                <div
                  key={index}
                  className="flex gap-4 relative justify-between"
                >
                  <div className="flex gap-2">
                    <div class="inline-flex items-center absolute top-1">
                      <label class="flex items-center cursor-pointer relative">
                        <input
                          defaultChecked
                          type="checkbox"
                          class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-full bg- shadow hover:shadow-md border border-slate-300 checked:bg-violet-500"
                          id="check-custom-style"
                          value={todo.complete}
                          checked={todo.complete}
                          onClick={() => checkboxTodo(index)}
                        />
                        <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="1"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </label>
                    </div>
                    <span
                      className={`text-xl text-gray-500 font-medium pr-28 pl-8 ${todo.complete && "line-through text-red-400"}`}
                    >
                      {todo.title}
                    </span>
                  </div>
                  <div className="flex gap-4 absolute right-0 top-1">
                    <button onClick={() => updateTodo(index)}>
                      <LuPenSquare size="1.2rem" color="gray" />
                    </button>
                    <button onClick={() => removeTodo(index)}>
                      <LuTrash2 size="1.2rem" color="gray" />
                    </button>
                    <button onClick={() => addSubTodo(index)}>
                      <LuPlusCircle size="1.2rem" color="gray" />
                    </button>
                  </div>
                </div>
                <hr className="mt-1" />
                {todo.subTodo &&
                  todo.subTodo.map((subTodo, indexSub) => (
                    <div key={indexSub} className="flex gap-4 pl-10 pt-2 justify-between relative">
                      <div className="flex gap-2">
                        <div class="inline-flex items-center absolute top-3">
                          <label class="flex items-center cursor-pointer relative">
                            <input
                              defaultChecked
                              type="checkbox"
                              class="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded-full bg- shadow hover:shadow-md border border-slate-300 checked:bg-violet-500"
                              id="check-custom-style"
                              value={subTodo.complete}
                              checked={subTodo.complete}
                              onClick={() => checkboxSubTodo(index, indexSub)}
                            />
                            <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="1"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </label>
                        </div>
                        <span className={`text-sm text-gray-500 pl-6 pr-20 ${subTodo.complete && "line-through text-red-400"}`}>
                          {subTodo.title}
                        </span>
                      </div>
                      <div className="flex gap-5 absolute right-0 top-2">
                        <button onClick={() => updateSubTodo(index, indexSub)}>
                          <LuPenSquare size="1rem" color="gray" />
                        </button>
                        <button onClick={() => removeSubTodo(index, indexSub)}>
                          <LuTrash2 size="1rem" color="gray" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
