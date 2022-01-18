/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { useGetCountries } from '../hooks/hooks';
import styled from 'styled-components';
import Image from 'next/image';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 610px;
    margin: 50px auto 0;

    .form {
        width: 210px;
        min-height: 26px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
        padding: 5px;
        font-size: 16px;
    } 
    .option {
        border-bottom: 1px solid #eee;
        padding: 5px;
        cursor: pointer;
        img {
            max-width:30px;
            margin-right: 10px;
        }
`;

export const Countries = () => {
    const [country, setCountry] = useState('');
    const [countryOptions, setCountryOptions] = useState([]);
    const { data: countries } = useGetCountries();

    /* handleClick = (name) => { }; */

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
            <div className='option' key={id} onClick={() => handleClick(name)}>
                <img src={flagUrl} alt={name} />
                <span>{name}</span>
            </div>
        ) : null;
    };

    return (
        <Container>
            <div className='form'>
                <h2> Countries </h2>
                <input type='text' value={country} onChange={handleInput} />
                {!!countryOptions.length && (
                    <div>
                        {countryOptions
                            .map((res) => renderCountry(res.media.flag, res.name, res.id))
                            .slice(0, 10)}
                    </div>
                )}
            </div>
        </Container>
    );
};