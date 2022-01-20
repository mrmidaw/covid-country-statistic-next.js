import React, { FC } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

export const Spinner: FC = () => {
    return (
        <div className=''>
            <ClipLoader size={30} />
        </div>
    );
};