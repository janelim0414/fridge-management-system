import React, { useState } from 'react';
import axios from 'axios';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

function AddIngredient(props) {
    const today = new Date().toLocaleString().split(',')[0];
    const [name, setName] = useState('');
    const [dop, setDop] = useState('');
    const [exp, setExp] = useState('');

    console.log(name, dop, exp, props.email);

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleDop = (event) => {
        setDop(event.target.value);
    };

    const handleExp = (event) => {
        setExp(event.target.value);
    };

    function addIngredient(event) {
        event.preventDefault();
        if (!name || !dop) {
            alert("Name and Purchase Date are required");
            return;
        }

        // Calculate expiration date if not provided
        const calculatedExp = exp || new Date(new Date(dop).setDate(new Date(dop).getDate() + 14)).toISOString().substring(0, 10);

        console.log(props.email);
        // Set new ingredient to be sent to database
        const newIngredient = {
            name: name,
            exp: calculatedExp,
            bought: dop,
            owner: props.email
        };
        console.log(newIngredient);

        // Set new ingredients
        const newIngredients = [...props.ingredientsList, newIngredient];

        // Make post request
        axios
        .post('http://localhost:4000/ingredients/upload', newIngredient)
        .then((res) => {
            props.searching ? props.search() : props.fetch();
        })
        .catch((e) => {
            console.error(e);
        })

        // Reset after submission
        setName("");
        setDop("");
        setExp("");
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose} className="rounded-xl">
            <DialogTitle as="h3" className="text-xl leading-6 text-gray-900">
                Add Ingredient
            </DialogTitle>
            <DialogContent>
                <div class="flex p-1">
                    <p className="pr-1">
                        Name of ingredient
                    </p>
                    <input 
                    className="border rounded-l px-2"
                    placeholder="ex. Apples"
                    value={name}
                    type="text"
                    onChange={handleName}
                    />
                </div>
                <div class="flex p-1">
                    <p className="p-1">
                        Purchase date:
                    </p>
                    <input 
                    className="text-gray-500 px-2 underlined-input underline-offset-2"
                    value={dop}
                    type="date"
                    onChange={handleDop}
                    />
                </div>
                <div class="flex p-1">
                    <p className="p-1">
                        Expiration date:
                    </p>
                    <input 
                    className="text-gray-500 px-2 underlined-input underline-offset-2"
                    value={exp}
                    type="date"
                    onChange={handleExp}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <div className="flex space-x-8 p-3">
                    <button onClick={props.handleClose}>
                        Close
                    </button>
                    <button className="text-orange-400 " onClick={addIngredient}>
                        Add
                    </button>
                </div>
            </DialogActions>
        </Dialog>
    );
}

export default AddIngredient;