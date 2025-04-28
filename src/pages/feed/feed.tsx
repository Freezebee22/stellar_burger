import { useSelector } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';

export const Feed: FC = () => {
	/** TODO: взять переменную из стора */
	const orders: TOrder[] = useSelector(store => store.ordersReducer.data);

	if (!orders.length) {
		return <Preloader />;
	}

	<FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
