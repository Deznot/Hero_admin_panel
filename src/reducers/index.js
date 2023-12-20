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
            const filteredHeroesAfterDeleted = (state.activeFilter === 'all')? state.heroes.filter( hero => hero.id !== action.payload ):
            state.heroes.filter(item => (item.id !== action.payload) && (item.element === state.activeFilter));
            
            return {
                ...state,
                heroes: newHeroes,
                filteredHeroes : [...filteredHeroesAfterDeleted],
                heroesLoadingStatus: 'idle'
            }
        case 'HERO_ADD':
            const filteredNewHeroes = (state.activeFilter === 'all')? [...state.heroes, action.payload]:
            [...state.heroes, action.payload].filter(item => item.element === state.activeFilter);
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                filteredHeroes : [...filteredNewHeroes],
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