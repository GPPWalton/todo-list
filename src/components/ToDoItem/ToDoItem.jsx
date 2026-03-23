import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./ToDoItem.scss";
const ToDoItem = ({ taskData, index, handleDelete }) => {
    const [isComplete, setIsComplete] = useState(false);
    const toggleCompletion = () => {
        setIsComplete(!isComplete);
    };
    return (
        <article>
            <input
                type='checkbox'
                name='completion status'
                checked={isComplete}
                onChange={() => toggleCompletion()}
            />
            <p className={isComplete ? "todo-item__complete" : ""}>
                {taskData}
            </p>
            <button onClick={() => handleDelete(index)}>
                <FontAwesomeIcon aria-label='Delete' icon={faTrash} />
            </button>
        </article>
    );
};

export default ToDoItem;
