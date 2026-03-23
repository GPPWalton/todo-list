import { useEffect, useState } from "react";
import ResetButton from "../../components/ResetButton/ResetButton";
import ToDoInput from "../../components/ToDoInput/ToDoInput";
import ToDoList from "../ToDoList/ToDoList";
import ToDoItem from "../../components/ToDoItem/ToDoItem";

import "./ToDoContainer.scss";
const ToDoContainer = () => {
    const [todoList, setTodoList] = useState(() => {
        try {
            const cached = localStorage.getItem("todoList");
            return cached ? JSON.parse(cached) : [];
        } catch (error) {
            console.error("Failed to load from cache:", error);
            return [];
        }
    });
    const [input, setInput] = useState("");

    //store toDoList in cache
    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }, [todoList]);
    const handleReset = () => {
        setTodoList([]);
    };
    const handleInput = event => {
        const { value } = event.target;
        setInput(value);
    };
    const handleAdd = () => {
        //append the the new input to the toDoList
        const newItem = { id: Date.now(), text: input };
        console.log(newItem);
        setTodoList(prevState => {
            return [...prevState, newItem];
        });
        //clear the input
        setInput("");
        //save the data to the cache
    };
    const handleDelete = id => {
        setTodoList(prevState => prevState.filter(item => item.id !== id));
    };
    return (
        <section className='todo-container'>
            <header className='todo-container__header'>
                <h1>My ToDo-List</h1>
                <ResetButton onReset={() => handleReset()} />
            </header>
            <section className='todo-container__content'>
                <ToDoInput
                    input={input}
                    onInput={handleInput}
                    onAdd={handleAdd}
                />
                <ToDoList>
                    {todoList.map(item => {
                        return (
                            <ToDoItem
                                key={item.id}
                                taskData={item.text}
                                id={item.id}
                                handleDelete={handleDelete}
                            />
                        );
                    })}
                </ToDoList>
            </section>
        </section>
    );
};

export default ToDoContainer;
