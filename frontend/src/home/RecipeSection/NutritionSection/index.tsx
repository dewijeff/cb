import React from "react";
import {Recipe} from "../../../Shared/models";
import {CalculateRecipeTotalCalories} from "../../../Shared/utilities";
import {Space} from "antd";

interface Props {
    recipe: Recipe;
}
const NutritionSection = ({recipe}: Props) => {
    // TODO: @JLD - only do this calculation once on load - memoize it and load it during initial load?
    const nutrition = CalculateRecipeTotalCalories(recipe);

    return (
          <Space direction='vertical'>
              <Space direction='horizontal'>
                  <span>Servings: {recipe.servings}</span>
              </Space>
              <Space direction='horizontal'>
                  <span>Calories Per Serving: {nutrition.calories}</span>
              </Space>
              <Space direction='horizontal'>
                  <span>Sodium Per Serving: {nutrition.sodium}mg</span>
              </Space>
          </Space>
    );
};

export default NutritionSection;