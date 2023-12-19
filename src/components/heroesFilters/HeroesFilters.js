import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import {filtersFetching, filtersFetchingError, filtersFetched, setActiveFilter, applyFilter} from "../../actions";
import Spinner from "../spinner/Spinner";
import classNames from "classnames";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state);
    const {request} = useHttp();
    
    useEffect(() => {
        dispatch(filtersFetching());
        request(`http://localhost:3001/filters`)
        .then((data) => dispatch(filtersFetched(data)))
        .catch(err => {
            console.log(err);
            dispatch(filtersFetchingError()) 
        });
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
                            dispatch(setActiveFilter(filter.name))
                            dispatch(applyFilter())
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