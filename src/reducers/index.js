const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filtersLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all',
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
            return {
                ...state,
                heroes: state.heroes.filter( hero => hero.id !== action.payload ),
                heroesLoadingStatus: 'idle'
            }
        case 'HERO_ADD':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                heroesLoadingStatus: 'idle'
            }
        case 'FILTERS_APPLY':
            return {
                ...state,
                heroes: [...state.heroes],
                heroesLoadingStatus: 'idle'
            }
        default: return state
    }
}

export default reducer;