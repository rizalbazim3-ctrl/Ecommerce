import React from "react";
import axios from "axios"

function Home() {
  const fetchbook = async () => {
  console.log("Before PATCH");

  const response = await axios.patch(
    "http://localhost:4000/books/2",
    { title: "basim" }
  );

  console.log("After PATCH");
  console.log(response.data);
};

  return (
    <div>
      <button onClick={()=>fetchbook()}>Click</button>
    </div>
  );
}

export default Home;