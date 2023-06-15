import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchRole } from '@/config/api';
import { IRole } from '@/types/backend';

interface IState {
    isFetching: boolean;
    meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: IRole[]
}
// First, create the thunk
export const fetchRole = createAsyncThunk(
    'resume/fetchRole',
    async ({ query }: { query: string }) => {
        const response = await callFetchRole(query);
        return response;
    }
)


const initialState: IState = {
    isFetching: true,
    meta: {
        current: 1,
        pageSize: 10,
        pages: 0,
        total: 0
    },
    result: []
};


export const roleSlide = createSlice({
    name: 'role',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {



    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchRole.pending, (state, action) => {
            state.isFetching = true;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchRole.rejected, (state, action) => {
            state.isFetching = false;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchRole.fulfilled, (state, action) => {
            if (action.payload && action.payload.data) {
                state.isFetching = false;
                state.meta = action.payload.data.meta;
                state.result = action.payload.data.result;
            }
            // Add user to the state array

            // state.courseOrder = action.payload;
        })
    },

});

export const {

} = roleSlide.actions;

export default roleSlide.reducer;
