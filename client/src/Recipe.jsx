import React from "react";

function Recipe(props) {
    return (
        <figure className="border bg-slate-100 rounded-xl p-3 m-3 w-96">
            <h1 className="text-xl pb-2"> 
                {props.title}
            </h1>
            <h1 className="text-xl pb-3 pt-2"> 
                Ingredients
            </h1>
            {props.ingredients.map((ingredient) => {
                return(
                    <p className="pb-1">
                        {ingredient} <br/>
                    </p>
                );
            })}
            <h1 className="text-xl pb-3 pt-2"> 
                Instructions
            </h1>
            {props.instructions.map((instruction) => {
                return(
                    <p className="pb-1">
                        {instruction} <br/>
                    </p>
                );
            })}
            
        </figure>
    ); 
}

export default Recipe;