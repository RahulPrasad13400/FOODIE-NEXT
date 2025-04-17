import MealItem from "./meal-item"
import classes from "./meals-grid.module.css"

export default function MealsGrid({meals}) {
  return (
    <div className={classes.meals}>
        {meals.map((meal)=>{
            return <li key={meal.id}>
                <MealItem {...meal} />
            </li>
        })}
    </div>
  )
}
