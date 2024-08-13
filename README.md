# fridge-management-system

Streamline your meal planning with our kitchen management app. 

This app helps users effectively manage their kitchen by keeping an inventory of pantry items, ordering them by their expiration dates, and suggesting AI-generated recipes based on what's in the kitchen, as a solution to minimize food waste and meal prep time. \
Whether you’re cooking for one or feeding a family, this app helps you create delicious meals using what’s already in your kitchen.

## Overview of the app

The app has a three-tier architecture, using React for frontend, Node and Express for backend, and Postgres for database. \
TailwindCSS was used for styling.

The app's features are the following:
1. 'Sign in with Google' with Firebase, for convenience and data security
   - Simplified login & sign-up experience
   - Protect ingredients data from other users (POST request used for retrieving ingredients data to prevent viewing other users' ingredients by manipulating parameters)
2. Quick search
   - Quickly search for an ingredient to avoid purchasing ingredients already in the kitchen
3. Order by expiration date
   - View ingredients in order of their expiration date so users know what needs to be consumed first
   - When adding a new ingredient, if it is a produce and doesn't have a specified expiration date, the app automatically assigns a date 14 days away from purchase date if expiration date is not entered
4. Generate recipes with AI
   - Send current ingredients list to ChatGPT using OpenAI API to generate recipes
   - Prioritizes ingredients that need to be consumed first when generating recipes
  
Features coming soon:
1. Editing ingredients
2. Saving favorite recipes

## To test
The app is not yet deployed, but it may be run locally to test the implemented features. \
To test the app, fork/clone the repository and do the following:
- Create postgres database locally with following tables
  - users table
    - email (primary)
    - name 
  - ingredients table
    - id (primary)
    - name
    - exp
    - bought
    - owner (foreign key, referring to users email)
- Get Firebase API key (put in .env) and OpenAI API key
- Edit the db credentials in api/queries.js (pool constant)
- npm install in api and client to create node_modules
- npm start in client & node index.js in api to start running

