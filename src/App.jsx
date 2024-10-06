import { useState, useEffect } from "react";
import StatusMessage from "./components/StatusMessage";
import RecipeDropdown from "./components/RecipeDropdown";
import RecipeDetails from "./components/RecipeDetails";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/recipes?select=name")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data.recipes);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching recipes.");
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });
  }, []);

  const handleRecipe = (e) => {
    const selectedId = e.target.value;
    fetchRecipeDetails(selectedId);
  };

  const fetchRecipeDetails = async (id) => {
    const cacheKey = `recipe-${id}`;
    try {
      const cachedData = await caches.match(cacheKey);

      if (cachedData) {
        const data = await cachedData.json();
        setSelectedRecipe(data);
        setError("");
      } else {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/recipes/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSelectedRecipe(data);
        setError("");

        caches.open("recipe-cache").then((cache) => {
          cache.put(cacheKey, new Response(JSON.stringify(data)));
        });
        setLoading(false);
      }
    } catch (error) {
      const cachedData = await caches.match(cacheKey);
      if (cachedData) {
        const data = await cachedData.json();
        setSelectedRecipe(data);
        setError("Failed to fetch from the network. Displaying cached data.");
      } else {
        setError("Error fetching recipe details and no cached data available.");
        setSelectedRecipe(null);
        console.error("Error fetching recipe details:", error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Discover Delicious Recipes</h1>
      <StatusMessage loading={loading} error={error} />
      <RecipeDropdown recipes={recipes} handleRecipe={handleRecipe} />
      <RecipeDetails recipe={selectedRecipe} />
    </div>
  );
}

export default App;
