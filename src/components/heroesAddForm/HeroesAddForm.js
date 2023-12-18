import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { heroAdd } from "../../actions";
import { useHttp } from '../../hooks/http.hook';
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [name,setName] = useState("");
    const [description, setDescription] = useState("");
    const [element,setElement] = useState("");
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        getFilterOptions()
    } ,[]);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const hero = {
            id : uuidv4(),
            name,
            description,
            element,
        }

        request(`http://localhost:3001/heroes`, "POST", JSON.stringify(hero))
        .then((data) => console.log(data))
        .then(() => dispatch(heroAdd(hero)))
        .catch((error) => console.error(new Error('add hero error' + error)))

        setName('');
        setDescription('');
        setElement('');

    }

    const getFilterOptions = () => {
        request(`http://localhost:3001/filters`)
        .then((data) => setFilters(data))
        .catch(err => console.log(err));
    }

    const createFilterOptions = (dataForOptions) => {
        let options;
        if (dataForOptions && dataForOptions.length > 0 ) {
            options = dataForOptions.map((option,i) => {
                // eslint-disable-next-line
                if (option === 'all') return;
                return <option key={i} value={option}>{option}</option>
            });
            console.log(options);
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
                    {createFilterOptions(filters)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;