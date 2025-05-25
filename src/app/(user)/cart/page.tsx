'use client';

import CartSummary from './components/CartSummary';
import { CartItem } from './components/CartItem';

const CartPage = () => {
    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='flex flex-col lg:flex-row lg:space-x-10 space-y-6 lg:space-y-0'>
                <div className="w-full lg:w-2/3">
                    <CartItem />
                </div>
                <CartSummary />
            </div>
        </div>
    );
};

export default CartPage;
