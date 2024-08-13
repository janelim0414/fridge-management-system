import React from "react";

function Ingredient(props) {
    return (
        <figure className="border bg-slate-100 rounded-xl p-8 w-64 m-5">
            <h1 className="text-xl pb-3"> 
                {props.name}
            </h1>
            <p className="pb-3">
                dop: {props.bought} <br/>
                exp: {props.exp}
            </p>
            <div className="flex space-x-14 place-content-center">
                <button className="border bg-white rounded w-16 p-1" onClick={props.edit}>
                    Edit
                </button>
                <button className="border bg-white rounded w-16 p-1" onClick={props.delete}>
                    Delete
                </button>
            </div>
        </figure>
        ); 
}

export default Ingredient;