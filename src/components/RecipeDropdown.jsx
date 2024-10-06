const RecipeDropdown = ({ recipes, handleRecipe }) => {
  return (
    <select className="dropdown" onChange={handleRecipe}>
      <option>Select a recipe</option>
      {recipes.map((recipe) => (
        <option key={recipe.id} value={recipe.id}>
          {recipe.name}
        </option>
      ))}
    </select>
  );
};

export default RecipeDropdown;
