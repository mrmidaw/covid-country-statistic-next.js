import React from 'react';
import { useGetStats } from '../hooks/hooks';
import { Spinner } from './Spinner';


const editNumbers = (country) => {
    return country.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const CountryData = ({ country }) => {
    const { data, error, loading } = useGetStats(country);


    return (
        <div className=''>
            {error &&
                <p
                    className='text-3xl font-semibold text-red-600 absolute'>
                    Error...
                </p>
            }

            {loading && <Spinner />}

            {data && !!Object.keys(data).length && !error && !loading && (
                <>
                    <h2 className='font-bold text-xl'>COVID-19 Statistic</h2>
                    <div className='grid grid-rows-2 m-1'>
                        <p>
                            <span className='font-medium text-lg'>
                                Confirmed - {editNumbers(data.confirmed.value)}
                            </span>
                        </p>

                        <p>
                            <span className='font-medium text-lg' >
                                Deaths - {editNumbers(data.deaths.value)}
                            </span>
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};