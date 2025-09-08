import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Handle payment success
        const handlePaymentSuccess = async () => {
            try {
                // You can add any success logic here
                setMessage('Payment successful! Your order has been placed.');

                // Clear cart after successful payment
                const token = localStorage.getItem('token');
                if (token) {
                    await axios.post(
                        'http://localhost:3001/checkout/clear-cart',
                        {},
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                }
            } catch (error) {
                console.error('Error handling payment success:', error);
                setMessage('Payment successful, but there was an error clearing your cart.');
            } finally {
                setLoading(false);
            }
        };

        handlePaymentSuccess();
    }, []);

    const handleContinueShopping = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Processing your payment...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                    <p className="text-gray-600">{message}</p>
                </div>

                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
                    <ul className="text-sm text-blue-800 text-left">
                        <li>• Your order has been confirmed</li>
                        <li>• You'll receive an SMS confirmation</li>
                        <li>• Your delicious bakery items will be prepared fresh</li>
                        <li>• Delivery will be made to your address</li>
                    </ul>
                </div>

                <button
                    onClick={handleContinueShopping}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Continue Shopping
                </button>

                <p className="text-xs text-gray-500 mt-4">
                    Thank you for choosing Gurukul Bakery! 🧁
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
