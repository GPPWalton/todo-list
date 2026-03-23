import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ToDoItem.scss";
const ToDoItem = ({
    taskData,
    id,
    handleDelete,
    isComplete,
    toggleCompletion
}) => {
    return (
        <article className='todo-item'>
            <input
                type='checkbox'
                name='completion status'
                checked={isComplete}
                onChange={toggleCompletion}
            />
            <p className={isComplete ? "todo-item__complete" : ""}>
                {taskData}
            </p>
            <button
                className='todo-item__delete-button'
                onClick={() => handleDelete(id)}
            >
                <FontAwesomeIcon aria-label='Delete' icon={faTrash} />
            </button>
        </article>
    );
};

export default ToDoItem;
