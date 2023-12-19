const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filtersLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                filteredHeroes: state.activeFilter === 'all' ? action.payload : action.payload.filter((hero) => hero.element === state.activeFilter),
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'FILTERS_SET_ACTIVE':
            return {
                ...state,
                activeFilter: action.payload
            }
        case 'HERO_DELETE':
            const newHeroes = state.heroes.filter( hero => hero.id !== action.payload );
            return {
                ...state,
                heroes: newHeroes,
                heroesLoadingStatus: 'idle'
            }
        case 'HERO_ADD':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                heroesLoadingStatus: 'idle'
            }
        case 'FILTERS_APPLY':
            const filteringHeroes = (state.activeFilter === 'all') ? state.heroes :
            state.heroes.filter((hero) => hero.element === state.activeFilter);

            return {
                ...state,
                filteredHeroes: [...filteringHeroes],
                heroesLoadingStatus: 'idle'
            }
        default: return state
    }
}

export default reducer;