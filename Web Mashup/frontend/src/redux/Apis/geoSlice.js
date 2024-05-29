import { apiSlice } from "./apiSlice";


const geoSlice = apiSlice.injectEndpoints({
    endpoints: (builders) => ({
        autoComplete: builders.query({
            query: (search) => ({
                url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${search}&apiKey=c8f30047470149c1895f5be68475f667`
            })
        })
    })
})

export const { useAutoCompleteQuery } = geoSlice