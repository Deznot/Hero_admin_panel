import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { heroesAdd } from "../../components/heroesList/heroesSlice";
import { useHttp } from '../../hooks/http.hook';
import { selectAll } from '../heroesFilters/filtersSlice';
import store from "../../store";
import { useCreateHeroesMutation } from '../api/apiSlice';

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [name,setName] = useState("");
    const [description, setDescription] = useState("");
    const [element,setElement] = useState("");
    const filters = selectAll(store.getState());
    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const [createHeroes, {isLoading}] = useCreateHeroesMutation();
    const onSubmitHandler = (e) => {
        e.preventDefault();

        const hero = {
            id : uuidv4(),
            name,
            description,
            element,
        }

        createHeroes(hero).unwrap();

        // request(`http://localhost:3001/heroes`, "POST", JSON.stringify(hero))
        // .then((data) => console.log(data))
        // .then(() => dispatch(heroesAdd(hero)))
        // .catch((error) => console.error(new Error('add hero error' + error)))

        setName('');
        setDescription('');
        setElement('');

    }

    const createFilterOptions = (dataForOptions, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }
        let options;
        if (dataForOptions && dataForOptions.length > 0 ) {
            options = dataForOptions.map((option) => {
                // eslint-disable-next-line
                if (option.name === 'all') return;
                return <option key={option.id} value={option.name}>{option.label}</option>
            });
        }
        return options;
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }
    
    const onChangeDescr = (e) => {
        setDescription(e.target.value);
    }

    const onChangeElement = (e) => {
        setElement(e.target.value);
    }

    return (
        <form onSubmit={onSubmitHandler} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={name} 
                    onChange={onChangeName}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={description} 
                    onChange={onChangeDescr}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={element} 
                    onChange={onChangeElement}
                    >
                    <option >Я владею элементом...</option>
                    {createFilterOptions(filters,filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;