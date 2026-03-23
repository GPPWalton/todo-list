import "./ResetButton.scss";
const ResetButton = ({ onReset }) => {
    return (
        <button className='reset-button' onClick={onReset}>
            Reset
        </button>
    );
};

export default ResetButton;
