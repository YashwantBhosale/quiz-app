import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenuCard = ({ imageSrc, buttonText, buttonLink }) => {
    const navigate = useNavigate();

    return (
        <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[30%] max-w-[300px] mt-[100px] rounded-xl pt-[25px] overflow-hidden">
            <img
                src={imageSrc}
                alt="quiz-icon"
                className="w-[150px] h-[150px] mx-auto block my-[30px]"
            />
            <button
                onClick={() => navigate(buttonLink)}
                className="text-xl bg-green-500 text-white text-center px-5 py-5 mt-[20px] w-full"
            >
                {buttonText} &#8594;
            </button>
        </div>
    );
};

export default MenuCard;
