import { apiSlice } from "./apiSlice";

const USERS_URL = '/api';


export const instasApiSlice  = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInstaAccounts:builder.mutation({
            query:() => ({
                url: `${USERS_URL}/instacart`, 
                method:'GET', 
                credentials: 'include'
            })
        }),
    })
})

export const { useGetInstaAccountsMutation}  = instasApiSlice;