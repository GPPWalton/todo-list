import { useEffect, useState } from "react";
import ResetButton from "../../components/ResetButton/ResetButton";
import ToDoInput from "../../components/ToDoInput/ToDoInput";
import ToDoList from "../ToDoList/ToDoList";
import ToDoItem from "../../components/ToDoItem/ToDoItem";

import "./ToDoContainer.scss";
const ToDoContainer = () => {
    const [todoList, setTodoList] = useState([]);
    const [input, setInput] = useState("");

    //TODO: also figure out how to load from cache as well if server is not connected?
    //get todoList from server on mount
    useEffect(() => {
        const loadTodos = async () => {
            try {
                const res = await fetch(import.meta.env.VITE_TODO_LIST_API);
                const data = await res.json();
                setTodoList(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to load todo list:", error);
                setTodoList([]);
            }
        };
        loadTodos();
    }, []);

    const toggleCompletion = id => {
        setTodoList(prevState =>
            prevState.map(item =>
                item.id === id
                    ? { ...item, isComplete: !item.isComplete }
                    : item
            )
        );
    };
    const handleReset = async () => {
        try {
            await fetch(`${import.meta.env.VITE_TODO_LIST_API}/clear`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            // Remove item from local state after successful deletion
            setTodoList([]);
        } catch (error) {
            console.error("Failed to clear todo-list", error);
        }
    };
    const handleInput = event => {
        const { value } = event.target;
        setInput(value);
    };
    const handleAdd = async e => {
        e.preventDefault();
        if (!input.trim()) return;

        const newItem = {
            id: Date.now().toString(),
            text: input,
            isComplete: false
        };

        // Update local state immediately (optimistic update)
        setTodoList(prev => [...prev, newItem]);

        // Clear input
        setInput("");

        // Send to backend
        try {
            const res = await fetch(`${import.meta.env.VITE_TODO_LIST_API}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ task: newItem })
            });
            const data = await res.text(); // Backend sends plain text
            console.log(data);
        } catch (error) {
            console.error("Failed to add task:", error);
            // Optionally rollback state here
        }
    };
    const handleDelete = async id => {
        try {
            await fetch(`${import.meta.env.VITE_TODO_LIST_API}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            // Remove item from local state after successful deletion
            setTodoList(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };
    return (
        <section className='todo-container'>
            <header className='todo-container__header'>
                <h1>My Todo List</h1>
                <ResetButton onReset={() => handleReset()} />
            </header>
            <section className='todo-container__content'>
                <ToDoInput
                    input={input}
                    onInput={handleInput}
                    onAdd={handleAdd}
                />
                <ToDoList>
                    {todoList.length > 0 ? (
                        todoList.map(item => {
                            return (
                                <ToDoItem
                                    key={item.id}
                                    taskData={item.text}
                                    id={item.id}
                                    handleDelete={handleDelete}
                                    isComplete={item.isComplete}
                                    toggleCompletion={() =>
                                        toggleCompletion(item.id)
                                    }
                                />
                            );
                        })
                    ) : (
                        <p className='todo-container__placeholder'>
                            Nothing to see here yet .. Add in the field above!
                            👆
                        </p>
                    )}
                </ToDoList>
            </section>
        </section>
    );
};

export default ToDoContainer;
