import React, { useState } from 'react';
import axios from 'axios';

interface CheckoutProps {
    cartItems: any[];
    totalAmount: number;
    onPaymentSuccess: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalAmount, onPaymentSuccess }) => {
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePayment = async () => {
        if (!deliveryAddress || !phoneNo) {
            setError('Please fill in all required fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(
                'http://localhost:3001/checkout/initiate-payment',
                {
                    deliveryAddress,
                    phoneNo
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                // Redirect to PhonePe payment page
                window.location.href = response.data.data.paymentUrl;
            } else {
                setError(response.data.message || 'Payment initiation failed');
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>

            {/* Order Summary */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
                {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between py-2 border-b">
                        <span>{item.product.name} x {item.quantity}</span>
                        <span>₹{(item.quantity * item.product.price).toFixed(2)}</span>
                    </div>
                ))}
                <div className="flex justify-between py-2 border-b">
                    <span>Delivery Fee</span>
                    <span>₹20.00</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-lg">
                    <span>Total</span>
                    <span>₹{(totalAmount + 20).toFixed(2)}</span>
                </div>
            </div>

            {/* Delivery Information */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Delivery Information</h3>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                    <textarea
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Enter your delivery address"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <input
                        type="tel"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your phone number"
                        required
                    />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {/* Payment Button */}
            <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Processing...' : `Pay ₹${(totalAmount + 20).toFixed(2)}`}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
                You will be redirected to PhonePe for secure payment
            </p>
        </div>
    );
};

export default Checkout;
