import React, { useEffect, useState } from "react";
import axios from 'axios';
import Ingredient from "./Ingredient.jsx";
import AddIngredient from "./AddIngredient.jsx";
import GenerateRecipes from "./GenerateRecipes.jsx";

function Main(props) {
    const [ingredientsList, setIngredients] = useState([]);
    const [searching, setSearching] = useState(false);
    const [query, setQuery] = useState('');
    const [openAdd, setOpenAdd] = useState(false);
    const [openRecipes, setOpenRecipes] = useState(false);

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        fetchIngredients();
    }, []);

    const fetchIngredients = () => {
        axios
        .post('http://localhost:4000/ingredients', {email: props.user.email})
        .then(res => {
            console.log(res.data);
            setIngredients(res.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    function searchIngredient(name) {
        console.log(props.user.email, name);
        axios
        .post(`http://localhost:4000/ingredients/search`, {email: props.user.email, name: name})
        .then((res) => {
            setIngredients(res.data);
            setSearching(true);
        })
        .catch((e) => {
            console.error(e);
        })
    }

    function handleSearchSubmit(event) {
        event.preventDefault(); // Prevent form submission
        searchIngredient(query);
    }

    function deleteIngredient(id) {
        axios
        .delete(`http://localhost:4000/ingredients/${id}`)
        .then((res) => {
            searching ? searchIngredient(query) : fetchIngredients();
        })
        .catch((e) => {
            console.error(e);
        })
    }

    function editIngredient(id, name, dop, exp) {
        axios
        .put(`http://localhost:4000/ingredients/${id}`, {
            id: id,
            name: name,
            exp: exp,
            bought: dop,
        })
        .then((res) => {
            fetchIngredients();
        })
        .catch((e) => {
            console.error(e);
        })
    }

    return (
        <div className="text-center pt-8">
            <form onSubmit={handleSearchSubmit}>
                <input className="border rounded-full w-96 h-10 p-5"
                type="text" 
                placeholder="Search an ingredient" 
                value={query} 
                onChange={handleQueryChange} 
                />
            </form>
            <div className="flex space-x-16 place-content-center mt-10 mb-10">
                <button className="border text-l bg-white rounded-xl w-32 h-12" onClick={() => setOpenAdd(true)}> Add Ingredient </button>
                <AddIngredient 
                email={props.user.email}
                open={openAdd}  
                handleClose={() => setOpenAdd(false)} 
                searching={searching}
                search={() => searchIngredient(query)}
                fetch={() => fetchIngredients()}
                ingredientsList={ingredientsList} 
                handleAdd={setIngredients}/>
                <button className="text-l text-white bg-orange-400 rounded-xl w-32 h-12" onClick={() => setOpenRecipes(true)}> Let's Cook! </button>
                <GenerateRecipes
                open={openRecipes}
                handleClose={() => setOpenRecipes(false)}
                email={props.user.email}/>
            </div>
            <div className="flex flex-wrap mx-5 justify-items-center">
                {(ingredientsList).map((ingredient) => {
                    return (
                        <Ingredient
                        key={ingredient.id}
                        name={ingredient.name}
                        exp={new Date(ingredient.exp).toLocaleString().split(',')[0]}
                        bought={new Date(ingredient.bought).toLocaleString().split(',')[0]}
                        delete={() => deleteIngredient(ingredient.id)}
                        edit={() => editIngredient(ingredient.id)}
                        />
                    );
                })}
            </div>
            
        </div>

        
    );
}

export default Main;