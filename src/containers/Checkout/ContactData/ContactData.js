import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Name',
				},
				value: '',
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email',
				},
				value: '',
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
				},
				value: '',
			},
			postalCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code',
				},
				value: '',
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' },
					],
				},
				value: 'fastest',
			},
		},
		loading: false,
	};

	inputChangeHandler = (e, identifier) => {
		const updatedOrderForm = {
			...this.state.orderForm,
		};
		const updatedFormEl = {
			...updatedOrderForm[identifier],
		};
		updatedFormEl.value = e.target.value;
		updatedOrderForm[identifier] = updatedFormEl;

		this.setState({ orderForm: updatedOrderForm });
	};

	orderHandler = event => {
		event.preventDefault();
		this.setState({ loading: true });
		const formData = {};

		for (let key in this.state.orderForm) {
			formData[key] = this.state.orderForm[key].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
		};
		axios
			.post('/orders.json', order)
			.then(response => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({ loading: false });
			});
	};

	render() {
		const formInputArray = [];

		for (let key in this.state.orderForm) {
			formInputArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formInputArray.map(el => (
					<Input
						key={el.id}
						elementType={el.config.elementType}
						elementConfig={el.config.elementConfig}
						value={el.config.value}
						changed={event => this.inputChangeHandler(event, el.id)}
					/>
				))}
				<Button btnType="Success">ORDER</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
