import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Wrapper from '../../hoc/Wrapper';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
    purchasable: false,
    purchasing: false,
  };

  updatePurchable(ingredients) {
    const sumIngredients = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);

    this.setState({
      purchasable: sumIngredients > 0,
    });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert('You continued!');
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
    this.updatePurchable(updatedIngredients);
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
    this.updatePurchable(updatedIngredients);
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
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          minLimitDisabled={minLimitDisableInfo}
          maxLimitDisabled={maxLimitDisableInfo}
          purchasable={!this.state.purchasable}
          price={this.state.totalPrice}
          clicked={this.purchaseHandler}
        />
      </Wrapper>
    );
  }
}

export default BurgerBuilder;
