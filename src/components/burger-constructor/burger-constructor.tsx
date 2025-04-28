import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import { resetOrderModalData } from '../../services/slices/orders';

export const BurgerConstructor: FC = () => {
const dispatch = useDispatch();

	/** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
	const constructorItems = useSelector(store => store.builderReducer);
	const orderRequest = useSelector(store => store.ordersReducer.orderRequest);

	const orderModalData = useSelector(store => store.ordersReducer.orderModalData);

	const onOrderClick = () => {
		if (!constructorItems.bun || orderRequest) return;
	};
	const closeOrderModal = () => {
		dispatch(resetOrderModalData());
	};

	const price = useMemo(
		() =>
			(constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
			constructorItems.ingredients.reduce(
				(s: number, v: TConstructorIngredient) => s + v.price,
				0
			),
		[constructorItems]
	);

	//return null;

	return (
		<BurgerConstructorUI
			price={price}
			orderRequest={orderRequest}
			constructorItems={constructorItems}
			orderModalData={orderModalData}
			onOrderClick={onOrderClick}
			closeOrderModal={closeOrderModal}
		/>
	);
};
