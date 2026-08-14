import React from "react";
import { X } from "lucide-react";

function OrderView({value}) {
    const {setOrderViewCheck,order} = value
    
    const totalQuantity = order.items.reduce((total,item)=>{
    return total + item.quantity
    },0)

    const totalPrice = order.items.reduce((total , item)=> {
    return total + (item.price * item.quantity)
    },0)
    
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto hide-scrollbar rounded-2xl bg-yellow-100 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Order #{order.orderId}
            </h2>
            <p className="text-sm text-gray-500">
              {new Date(order.date).toLocaleString("en-Us",{
                month : "short",
                day : "numeric",
                year : "numeric"
              })}
            </p>
          </div>

          <button onClick={()=>{
            setOrderViewCheck(false)
          }}>
            <X />
          </button>
        </div>

        <div className="p-5 space-y-5">

          {/* Customer */}
          <div>
            <h3 className="font-semibold text-gray-800">Customer</h3>
            <p>{order.name}</p>
            <p className="text-sm text-gray-500">Total Qty:{totalQuantity}</p>
          </div>

          {/* Items */}
          <div>
            <h3 className="mb-3 font-semibold text-gray-800">
              Order Items
            </h3>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={crypto.randomUUID}
                  className="flex justify-between items-center p-3 rounded-lg bg-gray-50"
                >
                  <img src={item.image}
                   alt="project image"
                   className = "w-20"
                    />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">₹{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between border-t pt-4">
            <span className="font-semibold">Total</span>
            <span className="text-lg font-bold">₹{totalPrice}</span>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-semibold text-gray-800">Shipping Address</h3>
            <p className="text-gray-600">{order.email}</p>
            <p className="text-gray-600">{order.address.orderedPlace}</p>
            <p className="text-gray-600">{order.address.orderedStreet}</p>
            <p className="text-gray-600">{order.address.orderedState}</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default OrderView;