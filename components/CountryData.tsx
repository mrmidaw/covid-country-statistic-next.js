import React, { FC } from 'react';
import { useGetStats } from '../hooks/hooks';
import { Spinner } from './Spinner';

// Function to place commas after three digits
const editNumbers = (country: string) => {
    return country.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

interface ICountryDataProps {
    country: string;
};

export const CountryData: FC<ICountryDataProps> = ({ country }) => {
    const { data, error, loading }: any = useGetStats(country);


    return (
        <div className=''>
            {error &&
                <p
                    className='text-3xl font-semibold text-red-600 absolute grid justify-items-center'>
                    Error...
                </p>
            }

            {loading && <Spinner />}

            {data && !!Object.keys(data).length && !error && !loading && (
                <div className='grid justify-items-center'>
                    <h2 className='font-bold text-xl'>COVID-19 Statistic</h2>
                    <div className='grid grid-rows-2 m-1'>
                        <p>
                            <span className='font-medium text-lg'>
                                Confirmed - {editNumbers(data.confirmed.value)} cases.
                            </span>
                        </p>

                        <p>
                            <span className='font-medium text-lg' >
                                Deaths - {editNumbers(data.deaths.value)} cases.
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};