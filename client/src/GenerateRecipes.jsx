import React, { useState } from 'react';
import axios from 'axios';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Recipe from "./Recipe.jsx";

function GenerateRecipes(props) {
    const [recipes, setRecipes] = useState([]);

    function generateRecipes(event) {
        event.preventDefault();
        console.log(props.email);
        axios
        .post('http://localhost:4000/recipes', {email: props.email})
        .then((res) => {
            setRecipes(res.data);
        })
        .catch((e) => {
            console.error(e);
        })
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose} className="rounded-xl" maxWidth="xl">
            <DialogTitle as="h3" className="text-xl leading-6 text-gray-900">
                Click the button below to generate recipes you can make with your ingredients!
            </DialogTitle>
            <DialogContent>
                <div className="flex flex-wrap mx-5 justify-items-center">
                    {recipes.map((recipe) => {
                        return (
                            <Recipe title={ recipe.title } ingredients={ recipe.ingredients } instructions={ recipe.instructions }/>
                        );
                    })}
                </div>
            </DialogContent>
            <DialogActions>
                <div className="flex space-x-8 p-3">
                    <button onClick={() => {props.handleClose(); setRecipes([]);}}>
                        Close
                    </button>
                </div>
                <button className="text-white bg-orange-400 rounded-xl w-38 h-10 px-3" onClick={generateRecipes}>
                    Generate
                </button>
            </DialogActions>
        </Dialog>
    );
}

export default GenerateRecipes;