import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
const ToDoInput = ({ input, onInput, onAdd }) => {
    return (
        <section>
            <input
                name='input'
                placeholder='Add your task here...'
                onInput={onInput}
                value={input}
            />
            <button onClick={onAdd}>
                <FontAwesomeIcon aria-label='Add' icon={faCirclePlus} />
            </button>
        </section>
    );
};

export default ToDoInput;
