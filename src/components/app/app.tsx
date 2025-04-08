import {
	ConstructorPage,
	Feed,
	ForgotPassword,
	Login,
	NotFound404,
	Profile,
	ProfileOrders,
	Register,
	ResetPassword,
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
	AppHeader,
	IngredientDetails,
	Modal,
	OrderInfo,
	ProtectedRoute,
} from '@components';
import { Routes, Route } from 'react-router-dom';

const App = () => (
	<div className={styles.app}>
		<AppHeader />
		<Routes>
			<Route path='*' element={<NotFound404 />} />
			<Route path='/' element={<ConstructorPage />} />
			<Route path='/feed' element={<Feed />} />
			<Route
				path='/feed/:number'
				element={
					<Modal title='ZaVoZ' onClose={() => console.log('VVoZ')}>
						<OrderInfo />
					</Modal>
				}
			/>
			<Route
				path='/ingredients/:id'
				element={
					<Modal title='ZaVoZnya' onClose={() => console.log('VVoZnya')}>
						<IngredientDetails />
					</Modal>
				}
			/>
			<Route
				path='/profile/orders/:number'
				element={
					<ProtectedRoute>
						<Modal title='ZaVoZnyaha' onClose={() => console.log('VVoZnyaha')}>
							<OrderInfo />
						</Modal>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/login'
				element={
					<ProtectedRoute>
						<Login />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/register'
				element={
					<ProtectedRoute>
						<Register />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/forgot-password'
				element={
					<ProtectedRoute>
						<ForgotPassword />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/reset-password'
				element={
					<ProtectedRoute>
						<ResetPassword />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/profile'
				element={
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/profile/orders'
				element={
					<ProtectedRoute>
						<ProfileOrders />
					</ProtectedRoute>
				}
			/>
		</Routes>
	</div>
);

export default App;
