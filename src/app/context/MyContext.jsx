"use client";
import { createContext, useContext, useEffect, useState } from "react";

const DocContext = createContext();


const fakeData = [
  {
    id: "md07myij62rlyve3z7",
    date: "2025-07-11",
    time: "10:30:00",
    patientName: "Reyansh Gupta",
    assignedDoctor: "Dr. Rohan Mehta",
    status: "Pending"
  },
  {
    id: "md07nl6viovs7bzsbi",
    date: "2025-07-16",
    time: "10:30:00",
    patientName: "Diya Verma",
    assignedDoctor: "Dr. Rohan Mehta",
    status: "Pending"
  }
];


export const MyProvider = ({ children }) => {
  const [Data_Items, setData_Items] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("Data_Items");
      const parsed = stored ? JSON.parse(stored) : [];
      return parsed? [...parsed,...fakeData] : [...fakeData];
    }
    return [];
  });
  useEffect(() => {
    
  console.log(Data_Items);
  
  }, [Data_Items]);

  useEffect(() => {
    setTimeout(() => {
        localStorage.setItem("Data_Items", JSON.stringify(Data_Items));
    }, 1000);
  }, [Data_Items]);

  const localClear =()=>{
    localStorage.removeItem("Data_Items");
    setData_Items([]);
  }

  const contextValue = {
    Data_Items,
    setData_Items,localClear
  };
   
  return (
    <DocContext.Provider value={contextValue}>
      {children}
    </DocContext.Provider>
  );
};

export const useDocContext = () => useContext(DocContext);
