import "./heroesList.scss";
import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetHeroesQuery } from "../api/apiSlice";

import { heroesDelete, fetchHeroes } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

const HeroesList = () => {
    // const filteredHeroes = useSelector((state) => {
    //     return state.filters.activeFilter === 'all'? state.heroes.heroes : state.heroes.heroes.filter((hero) => hero.element === state.filters.activeFilter);
    // });
    const { 
            data: heroes = [],
            isFetching,
            isLoading,
            isSuccess,
            isError,
            error
            } = useGetHeroesQuery();
    const activeFilter = useSelector((state) => state.filters.activeFilter);

    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();

        if (activeFilter === 'all') {
            return filteredHeroes;
        } else {
            return filteredHeroes.filter(item => item.element === activeFilter);
        }
    }, [heroes, activeFilter]);

    const dispatch = useDispatch();
    const {request} = useHttp();

    
    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback(async (id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(data => console.log(data, "deleted"))
            .then(dispatch(heroesDelete(id)))
            .catch((err) => console.log(err))
            // eslint-disable-next-line  
    }, [request]); 

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
           return <CSSTransition
                        timeout={500}
                        classNames="hero"
            >
                <h5 className="text-center mt-5">Героев пока нет</h5>
            </CSSTransition>
        }

        return arr.map(({id, ...props}) => {
            return <CSSTransition
                        key={id}
                        timeout={500}
                        classNames="hero"
                    >
                        <HeroesListItem {...props} key={id} onDelete={() => onDelete(id)} />
                    </CSSTransition>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component={`ul`}>
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;