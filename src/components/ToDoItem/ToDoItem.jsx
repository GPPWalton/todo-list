import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ToDoItem = ({ taskData, index, handleDelete }) => {
    return (
        <article>
            <p>{taskData}</p>
            <button onClick={() => handleDelete(index)}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </article>
    );
};

export default ToDoItem;
