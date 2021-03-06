/* eslint-disable @next/next/no-img-element */
import React, { FC, useState } from 'react';
import { useGetCountries } from '../hooks/hooks';
import { CountryData } from './CountryData';

// interface IRenderCountry {
//     flagUrl: string;
//     name: string;
//     id: number;
// };

export const Countries: FC = () => {
    const [country, setCountry] = useState('');
    const [countrySelected, setCountrySelected] = useState('');
    const [countryOptions, setCountryOptions] = useState([]);
    const { data: countries } = useGetCountries();

    const handleClick = (name: string): void => {
        setCountry(name);
        setCountryOptions([]);
        setCountrySelected(name);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.value) {
            setCountry(e.target.value);
            const optionsCountryArr = countries.filter((res: any) => {
                const regex = new RegExp(e.target.value, 'gi');
                return res.name.match(regex);
            });
            setCountryOptions(optionsCountryArr);
        } else {
            setCountry('');
            setCountryOptions([]);
        }
    };

    const renderCountry = (flagUrl: string, name: string, id: number) => {
        return flagUrl ? (
            <div
                className='p-1 h-16 w-14 cursor-pointer ml-3 mt-4'
                key={id}
                onClick={() => handleClick(name)}
            >
                <img className='' src={flagUrl} alt={name} />
                <span className=' text-sm ' >{name}</span>
            </div >
        ) : null;
    };


    return (
        <div className='grid grid-cols-2 gap-2 mx-4 mt-4 h-auto justify-items-center '>
            <div className='grid justify-items-center h-20'>
                <h2 className='font-bold text-xl'> Countries </h2>
                <input
                    className=' w-44 text-center border-2 border-black font-medium text-lg'
                    type='text'
                    value={country}
                    onChange={handleInput}
                />
                {!!countryOptions.length && (
                    <div className='grid ' >
                        {countryOptions
                            .map((res: any) =>
                                renderCountry(res.media.flag, res.name, res.id))
                            .slice(0, 8)}
                    </div>
                )}
            </div>
            <div className='grid justify-items-center'>
                {countrySelected &&
                    <CountryData country={countrySelected} />
                }
            </div>
        </div>
    );
};