# Kitchen Management App

Streamline your meal planning with our kitchen management app. This app helps users effectively manage their kitchen by keeping an inventory of pantry items, ordering them by expiration dates, and suggesting AI-generated recipes based on what's in the kitchen, minimizing food waste and meal prep time. Whether you’re cooking for one or feeding a family, this app helps you create delicious meals using what’s already in your kitchen.

![Screenshot 2024-08-13 at 5 50 56 PM](https://github.com/user-attachments/assets/3b37e09a-2b92-455b-b52c-9a7e156965c1)

![Screenshot 2024-08-13 at 5 51 13 PM](https://github.com/user-attachments/assets/1901bd59-382a-4cb0-9926-92800da0788e)

## Overview

The app is built using a three-tier architecture:

- **Frontend:** React with TailwindCSS for styling
- **Backend:** Node.js and Express
- **Database:** PostgreSQL

### Features

- **Sign in with Google:** Secure and convenient authentication using Firebase
- **Ingredient Management:**
  - Quick search to avoid duplicate purchases
  - View ingredients ordered by expiration date
  - Automatic expiration date assignment for produce
- **AI-Generated Recipes:** Integration with OpenAI API to generate recipes based on current ingredients, prioritizing items that need to be consumed first

### Technical Highlights

- **Frontend:** Utilizes React Hooks and Context API for state management, TailwindCSS for responsive design
- **Backend:** Custom middleware for secure data handling, optimized database queries
- **Database:** Designed schema with indexing for performance, handling relational data between users and ingredients

### Features Coming Soon

- Ingredient editing
- Saving favorite recipes
- Enhanced recipe filtering and sorting

### Testing

To test the app locally:

1. Clone the repository
2. Set up the PostgreSQL database with the following tables:
   - `users` (email, name)
   - `ingredients` (id, name, exp, bought, owner)
3. Obtain Firebase and OpenAI API keys and configure them in `.env`
4. Update database credentials in `api/queries.js`
5. Run `npm install` in both `api` and `client` directories
6. Start the client with `npm start` and the server with `node index.js`

### Future Enhancements

- Deployment to cloud platforms like Heroku or Vercel
- Detailed performance benchmarks and optimizations
- Additional user features and integrations

### Contributing

Contributions are welcome! Please follow our [contributing guidelines](link-to-guidelines) for submitting pull requests and reporting issues.

### Credits

- Built with React, Node.js, Express, PostgreSQL, and TailwindCSS
- Uses Firebase for authentication and OpenAI API for recipe generation

