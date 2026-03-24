import {
    faChevronLeft,
    faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import "./Carousel.scss";

const Carousel = ({ imgArr, name }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleClick = directon => {
        const max = imgArr.length;
        setCurrentIndex(prevState => (prevState + directon + max) % max);
    };
    return (
        <article className='carousel'>
            {imgArr && (
                <img
                    className='carousel__img'
                    src={imgArr[currentIndex]}
                    alt={name}
                />
            )}
            <div className='carousel__button-container'>
                <button
                    className='carousel__button-container__buttons carousel__button-container__buttons--left'
                    onClick={() => handleClick(-1)}
                >
                    <FontAwesomeIcon
                        aria-label='Previous Image'
                        icon={faChevronLeft}
                    />
                </button>
                <button
                    className='carousel__button-container__buttons carousel__button-container_buttons--right'
                    onClick={() => handleClick(+1)}
                >
                    <FontAwesomeIcon
                        aria-label='Next Image'
                        icon={faChevronRight}
                    />
                </button>
            </div>
        </article>
    );
};

export default Carousel;
