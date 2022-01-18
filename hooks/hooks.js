import { useState, useEffect } from "react";


export const useGetCountries = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api.sampleapis.com/countries/countries')
                .then(res => res.json())
                .catch(err => console.log(err));
            setData(response);
        };

        fetchData();
    }, []);

    return {
        data
    };
};


export const useGetStats = (country) => {
    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const pause = () => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 1200);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');

            await pause();

            const response = await fetch(`https://covid19.mathdro.id/api/countries/${country}`)
                .then(res => res.json())
                .catch(err => console(err));


            if (!response.error) {
                setData(response);
            } else {
                setError(response.error.message);
            }

            setLoading(false);
        };

        fetchData();
    }, [country]);

    return {
        data,
        error,
        loading
    };
};