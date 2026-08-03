import React from 'react'
import { useNavigate } from 'react-router-dom'


function PaymentResult() {
  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      
      <div className="w-full max-w-md bg-[#fbf6ec] rounded-xl shadow-lg p-8 text-center">
        
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-3xl text-green-600">✓</span>
        </div>

        <h1 className="text-2xl font-bold text-[#3b2a1f]">
          Order Successful!
        </h1>

        <p className="text-gray-500 mt-2">
          Thank you for your purchase.
        </p>

        {/* <p className="text-sm text-gray-500 mt-4">
          Order ID: <span className="font-semibold text-gray-800">#BK12345</span>
        </p> */}

        <div className="flex flex-col gap-3 mt-6">
          <button onClick= {()=>{
            navigate("/Orders")
          }} 
          className="w-full py-3 bg-[#8a4a1f] border font-semibold text-white rounded-lg hover:bg-[#fbf6ec] hover:text-[#8a4a1f] hover:border-[#8a4a1f] hover:scale-102 tansition duration-500">
            View Order Details
          </button>

          <button onClick={()=>{
            navigate("/")
          }}
          className="w-full py-3 bg-[#fbf6ec] border font-semibold text-[#8a4a1f] border-[#8a4a1f]  rounded-lg hover:bg-[#8a4a1f] hover:text-white hover:scale-102 tansition duration-500">
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  )
}

export default PaymentResult