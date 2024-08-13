import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './queries.js';
import OpenAI from 'openai';

const PROMPT = `Your goal is to suggest three delicious home-cooked recipes based on a list of ingredients.

The recipes MUST adhere to these rules:
1. The recipes MUST be realistic and delicious.
2. The recipes may contain ingredients besides the ones given, IF necessary.
3. The recipes should prioritize ingredients listed first but not strictly necessary if that makes the recipes unrealistic.
4. The recipes should try to avoid using ingredients other than the ones given while ensuring the quality of the recipes.
5. The recipes MUST be consumable and realistic.

The returned recipes MUST be in the following JSON format. Your entire response/output is going to consist of a list of three JSON objects {}, and you will NOT wrap it within JSON md markers:
[{
    "title": name of recipe 1,
    "ingredients": list of ingredients,
    "instructions": list of instructions
},
{
    "title": name of recipe 1,
    "ingredients": list of ingredients,
    "instructions": list of instructions
},
{
    "title": name of recipe 1,
    "ingredients": list of ingredients,
    "instructions": list of instructions
}]

Here are some examples of a GOOD, realistic recipe.

Given "Mozzarella cheese, Butter", you might generate
{
    "title": "Grilled Cheese",
    "ingredients": ["2 slices of mozzarella cheese", "2 slices of bread of your choice", "1 tablespoon butter"],
    "instructions": ["1. Butter one side of each bread slice.", "2. Place one slice of bread, buttered side down, in a skillet over medium heat.", "3. Top the bread slice with two slices of mozzerella cheese.", "4. Place the remaining bread slice on top, buttered side up.", "5. Cook on medium heat until golden brown and cheese melts, about 3-4 minutes per side.", "6. Cut in half and serve hot."]
}

Given "Onion, Watermelon, Chicken thigh, Eggs, Soy sauce, Spinach", you might generate
{
    "title": "Oyakodon with Spinach",
    "ingredients": ["1 skinless chicken thigh, cut into bite-size pieces", "1/2 onion, thinly sliced", "1 cup fresh spinach", "2 eggs, lightly beaten", "2 tablespoons dashi stock", "2 tablespoons soy sauce", "1 tablespoon mirin", "1/8 teaspoon sugar", "Cooked rice, for serving"],
    "instructions": ["1. Combine the soy sauce, mirin, dashi stock and sugar. Stir to mix and dissolve the sugar.", "2. Add the chicken pieces and sliced onion to the broth. Heat the pan on medium heat. And cover with a lid.", "3. When the meat begins to turn white, flip it over.", "4. When the chicken is almost cooked, add the spinach. Then, distribute the beaten egg.", "5. Cover again. Cook the egg at least halfway through and then adjust the consistency to your taste.", "6. Place the ingredients onto a bowl of hot steamed rice and serve hot."]
}

Here are some examples of a BAD, unrealistic recipe.

Olive Soup with Whipped Cream, Banana Miso Soup, Chicken Tartare with Chocolate Sauce 
`
const app = express();
const port = 4000;
const openai = new OpenAI();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

async function generateRecipes(ingredients) {
    // ingredients: list of json
    function processIngredient(dict) {
        return dict.name;
    }
    const processed = ingredients.map(processIngredient).join(', ');
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: PROMPT }, { role: "user", content: `With this in mind, generate three recipes with ingredients: ${processed}` }],
    });
    const recipes = response.choices[0].message.content;
    return JSON.parse(recipes);
}

// Endpoints
app.get('/', (req, res) => {
    res.json({ message: 'wimf api!'});
});

app.get('/login/:email', async (req, res) => db.getUser(req, res));
app.post('/login', async (req, res) => db.createUser(req, res))
app.post('/ingredients', async (req, res) => {
    try {
        const ingredients = await db.getIngredients(req, res);
        res.status(200).send(ingredients);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch ingredients' });
    }
});
app.post('/ingredients/search', async (req,res) => db.getIngredientsByName(req, res));
app.post('/ingredients/upload', async (req, res) => db.createIngredient(req, res));
app.put('/ingredients/:id', async (req, res) => db.updateIngredient(req, res));
app.delete('/ingredients/:id', async (req, res) => db.deleteIngredient(req, res));

app.post('/recipes', async (req, res) => {
    try {
        const ingredients = await db.getIngredients(req, res); // Fetch ingredients from your database
        console.log(ingredients);
        const recipes = await generateRecipes(ingredients);
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get recipes' });
    }
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})