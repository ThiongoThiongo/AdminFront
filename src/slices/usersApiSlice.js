import { apiSlice } from "./apiSlice";

const USERS_URL = '/api';


export const usersApiSlice  = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login:builder.mutation({
            query:(data) => ({
                url: `${USERS_URL}/agentRoute/auth`, 
                method:'POST', 
                body:data,
                credentials: 'include'
            })
        }),
        loginadmin:builder.mutation({
            query:(data) => ({
                url: `${USERS_URL}/adminRoute/auth`, 
                method:'POST', 
                body:data,
                credentials: 'include'
            })
        }),
        logoutadmin:builder.mutation({
            query:() => ({
                url: `${USERS_URL}/adminRoute/logout`, 
                method:'POST', 
            })
        }),
        registerAgent:builder.mutation({
            query:(data) => ({
                url: `${USERS_URL}/agentRoute/`, 
                method:'POST', 
                body:data,
                credentials: 'include'
            })
        }),
        updateAdmin:builder.mutation({
            query:(data) => ({
                url: `${USERS_URL}/adminRoute/update`, 
                method:'POST', 
                body:data,
                credentials:  'include'
            
            })
        }),
    })
})

export const {useLoginMutation, useLoginadminMutation,useUpdateAdminMutation, useLogoutadminMutation, useRegisterAgentMutation}  = usersApiSlice;