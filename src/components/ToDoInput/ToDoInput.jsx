import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
const ToDoInput = ({ input, onInput, onAdd }) => {
    const isEmpty = input === "";
    return (
        <section>
            <input
                name='input'
                placeholder='Add your task here...'
                onInput={onInput}
                value={input}
            />
            <button onClick={onAdd} disabled={isEmpty}>
                <FontAwesomeIcon aria-label='Add' icon={faCirclePlus} />
            </button>
        </section>
    );
};

export default ToDoInput;
