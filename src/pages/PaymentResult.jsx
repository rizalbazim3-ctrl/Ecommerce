import React from 'react'
import { useNavigate } from 'react-router-dom'

function PaymentResult() {
  const navigate = useNavigate()
  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-4">
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        
        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-3xl text-green-600">✓</span>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-800">
          Order Successful!
        </h1>

        <p className="text-gray-500 mt-2">
          Thank you for your purchase.
        </p>

        {/* Order ID */}
        <p className="text-sm text-gray-500 mt-4">
          Order ID: <span className="font-semibold text-gray-800">#BK12345</span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-6">
          <button onClick= {()=>{
            navigate("/Orders")
          }} 
          className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800">
            View Order Details
          </button>

          <button onClick={()=>{
            navigate("/")
          }}
          className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-100">
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  )
}

export default PaymentResult