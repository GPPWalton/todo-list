import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import "./ToDoInput.scss";
const ToDoInput = ({ input, onInput, onAdd }) => {
    const isEmpty = input === "";
    return (
        <form className='todo-input' onSubmit={onAdd}>
            <input
                className='todo-input__input'
                name='input'
                placeholder='Add your task here...'
                onInput={onInput}
                value={input}
            />
            <button
                className='todo-input__add-button'
                type='submit'
                disabled={isEmpty}
            >
                <FontAwesomeIcon aria-label='Add' icon={faCirclePlus} />
            </button>
        </form>
    );
};

export default ToDoInput;
