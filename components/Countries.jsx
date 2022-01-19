/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { useGetCountries } from '../hooks/hooks';
import { CountryData } from './CountryData';


export const Countries = () => {
    const [country, setCountry] = useState('');
    const [countrySelected, setCountrySelected] = useState('');
    const [countryOptions, setCountryOptions] = useState([]);
    const { data: countries } = useGetCountries();

    const handleClick = (name) => {
        setCountry(name);
        setCountryOptions([]);
        setCountrySelected(name);
    };

    const handleInput = (e) => {
        if (e.target.value) {
            setCountry(e.target.value);
            const optionsCountryArr = countries.filter((res) => {
                const regex = new RegExp(e.target.value, 'gi');
                return res.name.match(regex);
            });
            setCountryOptions(optionsCountryArr);
        } else {
            setCountry('');
            setCountryOptions([]);
        }
    };

    const renderCountry = (flagUrl, name, id) => {
        return flagUrl ? (
            <div
                className='p-1 h-16 w-14 cursor-pointer ml-8 mt-4'
                key={id}
                onClick={() => handleClick(name)}
            >
                <img className='' src={flagUrl} alt={name} />
                <span className=' text-sm ' >{name}</span>
            </div >
        ) : null;
    };


    return (
        <div className='grid grid-cols-2 gap-4 mx-4 mt-4 h-auto '>
            <div className='grid justify-items-center h-20'>
                <h2 className='font-bold text-xl'> Countries </h2>
                <input
                    className=' grid text-center border-2 border-black font-medium text-lg'
                    type='text'
                    value={country}
                    onChange={handleInput}
                />
                {!!countryOptions.length && (
                    <div className='grid ' >
                        {countryOptions
                            .map((res) => renderCountry(res.media.flag, res.name, res.id))
                            .slice(0, 7)}
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