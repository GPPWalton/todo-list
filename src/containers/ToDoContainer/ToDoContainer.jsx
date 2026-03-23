import { useState } from "react";
const ToDoContainer = () => {
    const [todoList, setTodoList] = useState([]);
    const [input, setInput] = useState("");
    return (
        <section>
            <header>
                <h1>My ToDo-List</h1>
            </header>
        </section>
    );
};

export default ToDoContainer;
