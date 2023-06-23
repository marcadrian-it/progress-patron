"use client";
import React from 'react'
import { XSquare } from "react-feather";


const handleClick = () => {
    console.log("clicked");
    }

export const DeleteButton: React.FC = ({}) => {
        return (
            <button className="absolute top-2 right-2 mt-2 mr-2 text-red-500 cursor-pointer hover:scale-110 hover:text-white hover:bg-red-800 hover:rounded hover:p-[2px]" onClick={() => handleClick()}>
            <XSquare size={21} />
          </button>
        );
}