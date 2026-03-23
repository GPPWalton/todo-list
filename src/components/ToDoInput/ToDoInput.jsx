import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import "./ToDoInput.scss";
const ToDoInput = ({ input, onInput, onAdd }) => {
    const isEmpty = input === "";
    return (
        <section className='todo-input'>
            <input
                className='todo-input__input'
                name='input'
                placeholder='Add your task here...'
                onInput={onInput}
                value={input}
            />
            <button
                className='todo-input__add-button'
                onClick={onAdd}
                disabled={isEmpty}
            >
                <FontAwesomeIcon aria-label='Add' icon={faCirclePlus} />
            </button>
        </section>
    );
};

export default ToDoInput;
