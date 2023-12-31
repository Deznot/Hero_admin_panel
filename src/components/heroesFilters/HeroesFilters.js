import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {filtersSetActive, fetchFilters, selectAll} from "./filtersSlice";
import Spinner from "../spinner/Spinner";
import classNames from "classnames";
import store from "../../store";


const HeroesFilters = () => {
    const dispatch = useDispatch();
    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    useEffect(() => {
        dispatch(fetchFilters());
        //eslint-disable-next-line
    },[]);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }


    const createFilters = () => {
        const createdFilters = filters.map((filter,i) => {
            return <button 
                        key={i + filter.name} 
                        className={ classNames('btn', filter.className, {
                            "active": filter.name === activeFilter
                        })}
                        onClick={() => {
                            dispatch(filtersSetActive(filter.name))
                        }}
                    >{filter.label}
                    </button>
        });

        return (
            <div className="btn-group">
                {createdFilters}
            </div>
        );
    }

    const createdFilters = createFilters();
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                {createdFilters}
            </div>
        </div>
    )
}

export default HeroesFilters;