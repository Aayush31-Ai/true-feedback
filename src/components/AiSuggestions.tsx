"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AiSuggestions() {
  const [message, setMessage] = useState("");

  const fetchData=async()=>{
    // const result = await axios.get("/api/ai-message");
    // setMessage(result.data.message);
  }
useEffect(()=>{
  fetchData()
},[])

  return (
    <div className="p-4">
      <h1 className="font-bold text-xl mb-3">💡 AI Suggestions (Streaming)</h1>
      <div className="whitespace-pre-wrap text-black bg-gray-100 p-3 rounded-md">
        {message || "Loading..."}
      </div>
    </div>
  );
}
