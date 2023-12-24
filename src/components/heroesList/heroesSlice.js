import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
});

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes', //имя slice/тип действия
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:3001/heroes`);

    }//функция должна вернуть промис, если код синхронный необходимо вручную выбросить ошибку
    //принимает 2 аргумента; 1 то что приходит при диспатче действия (id или еще что то), 2 арг
    // thunkAPI
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesAdd: (state,action) => {
            heroesAdapter.addOne(state, action.payload)
        },
        heroesDelete: (state,action) => {heroesAdapter.removeOne(state, action.payload)}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = "loading"})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = "idle";
                heroesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchHeroes.rejected, (state) => {state.heroesLoadingStatus = "error"})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;

export const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);

export default reducer;

export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    selectAll,
    (filter, heroes) => {
        return filter === 'all'? heroes : heroes.filter((hero) => hero.element === filter);
    }
);
  
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesAdd,
    heroesDelete
} = actions;
