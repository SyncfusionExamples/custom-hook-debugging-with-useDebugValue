import { useCallback, useDebugValue, useEffect, useState } from "react";

export const useFetch = (url: string) => {
    const [response, setResponse] = useState<any>();
    const [status, setStatus] = useState<boolean>(false);
    const [error, setError] = useState<any>();

    useDebugValue('Success State of API Call: ' + status);
    useDebugValue('Error State of API Call: ' + error);
    useDebugValue(response, (res) => {
        if (res) {
            return `Data returned from API that shows local cases for today: ${res.data.local_new_cases}`;
        }
        return 'No Data Returned At The Moment';
    });

    const getData = useCallback(async () => {
        try {
            const resp = await fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await resp.json();
            setResponse(data);
            setStatus(data.success);
        } catch (err) {
            setError(err);
        }
    }, [url]);

    useEffect(() => {
        getData();
    }, [getData, url]);

    return { response, error };
}