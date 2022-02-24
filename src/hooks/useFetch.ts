import { useEffect, useState } from "react";

import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:4000/",
	timeout: 1000,
});

const useFetch = (
	url: string,
	method: any = "GET",
	data?: { [key: string]: any },
	params?: { [key: string]: any }
) => {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<
		{
			amount: number;
			date: string;
			transactionType: "debit" | "credit";
		}[]
	>([]);

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const { data: apiResponse } = await instance({
					url,
					method,
					...(data
						? {
								data,
						  }
						: {}),
					...(params
						? {
								params,
						  }
						: {}),
				});
				setResult(apiResponse);
				setLoading(true);
			} catch (error: any) {
				console.log("Error", error.message);
				setLoading(true);
			}
		})();

		return () => {};
	}, [url, method, params, data]);

	return { result, loading };
};

export default useFetch;
