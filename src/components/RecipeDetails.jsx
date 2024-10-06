function RecipeDetails({ recipe }) {
  if (!recipe) {
    return <p className="select-recipe">Please select a recipe to view details!</p>;
  }
  return (
    <div className="recipe-details">
      <h2>{recipe.name}</h2>
      <div className="ingredients-container">
        <p>
          <strong>Ingredients:</strong>
        </p>
        <div className="ingredients">
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="instructions-container">
        <p>
          <strong>Instructions:</strong>
        </p>
        <div className="instructions">- {recipe.instructions}</div>
      </div>

      <div className="difficulty-container">
        <p>
          <strong>
            Difficulty: <div className="difficulty">{recipe.difficulty}</div>
          </strong>
        </p>
      </div>
    </div>
  );
}

export default RecipeDetails;
