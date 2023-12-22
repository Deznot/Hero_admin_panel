import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filtersLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all',
}


const filtersSlice = createSlice(
    {
        name: 'filters',
        initialState,
        reducers: {
            filtersFetching: (state) => {state.filtersLoadingStatus = 'loading'},
            filtersFetched: (state,action) => {
                state.filters = action.payload;
                state.filtersLoadingStatus = 'idle';
            },
            filtersFetchingError: (state) => { state.filtersLoadingStatus = "error"},
            filtersSetActive: (state, action) => {
                state.activeFilter = action.payload;
                state.filtersLoadingStatus = "idle";
            }
        }
    }
);

const {actions, reducer} = filtersSlice;

export default reducer;

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filtersSetActive
} = actions;
