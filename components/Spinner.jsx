import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

export const Spinner = () => {
    return (
        <div className='loadingSpinnerContainer'>
            <ClipLoader size={12} />
        </div>
    );
};