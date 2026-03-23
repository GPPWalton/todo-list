import { useState } from "react";

const ToDoList = ({ children }) => {
    const [isComplete, setIsComplete] = useState(false);

    return <section>{children}</section>;
};

export default ToDoList;
