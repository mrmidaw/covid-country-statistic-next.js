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


export const useGetStats = (country: string) => {
    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Pause for loading
    const pause = () => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 1000);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');

            await pause();

            const response = await fetch(`https://covid19.mathdro.id/api/countries/${country}`)
                .then(res => res.json())
                .catch(err => console.log(err));


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