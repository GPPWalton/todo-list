import { useState } from "react";
import ResetButton from "../../components/ResetButton/ResetButton";
const ToDoContainer = () => {
    const [todoList, setTodoList] = useState([]);
    const [input, setInput] = useState("");
    const handleReset = () => {
        setTodoList([]);
    };
    return (
        <section>
            <header>
                <h1>My ToDo-List</h1>
                <ResetButton onReset={() => handleReset()} />
            </header>
        </section>
    );
};

export default ToDoContainer;
