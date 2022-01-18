import React from 'react';
import styled from 'styled-components';
import { useGetStats } from '../hooks/hooks';
import { Spinner } from './Spinner';

const Container = styled.div`
    width: 326px;
    height: 78px;
    position: relative;
    .message {
        position: absolute;
        left: 0;
        bottom: 0;
        margin: 0;
        font-size: 30px;
        color: #26c281;
    }
    .error {
        color: red;
    }
    .stats {
        display: flex;
        p {
            display: flex;
            flex-direction:column;
            margin: 0 10px 0 0;
        }
    }
`;

const editNumbers = (country) => {
    return country.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const CountryData = ({ country }) => {
    const { data, error, loading } = useGetStats(country);


    return (
        <Container>
            {error && <p className='message error'>Error...</p>}
            {loading && <Spinner />}

            {data && !!Object.keys(data).length && !error && !loading && (
                <>
                    <h2>COVID-19 Cases Statistic</h2>
                    <div className='stats'>
                        <p>
                            <span>
                                Confirmed
                            </span>
                            {editNumbers(data.confirmed.value)}
                        </p>

                        <p>
                            <span>
                                Deaths
                            </span>
                            {editNumbers(data.deaths.value)}
                        </p>
                    </div>
                </>
            )}
        </Container>
    );
};