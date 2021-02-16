import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Wrapper from '../../hoc/Wrapper';

const INGREDIENT_PRICES = {
  salad: 3.5,
  cheese: 7.4,
  meat: 10.3,
  bacon: 6.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 10,
  };

  addIngredientHandler = (type) => {
    const updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    const newIngredientValue = this.state.ingredients[type] + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newIngredientValue;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice,
    });
  };

  removeIngredientHandler = (type) => {
    const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    if (updatedTotalPrice <= 0) {
      return;
    }
    const newIngredientValue = this.state.ingredients[type] - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newIngredientValue;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice,
    });
  };

  render() {
    const ingredients = { ...this.state.ingredients };
    const minLimitDisableInfo = [];
    const maxLimitDisableInfo = [];
    for (let ingredient in ingredients) {
      minLimitDisableInfo[ingredient] = ingredients[ingredient] <= 0;
      maxLimitDisableInfo[ingredient] = ingredients[ingredient] >= 5;
    }

    return (
      <Wrapper>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          minLimitDisabled={minLimitDisableInfo}
          maxLimitDisabled={maxLimitDisableInfo}
          price={this.state.totalPrice}
        />
      </Wrapper>
    );
  }
}

export default BurgerBuilder;
