"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { DoctorNames, patientItems } from "../data";

const DocContext = createContext();


const fakeData = [
  {
    id: "md07myij62rlyve3z7",
    date: "2025-07-20 ",
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
  const [selectedRow, setSelectedRow] = useState(null);
  const [mbId, setmbId] = useState(null);
  const [open, setopen] = useState();
  const [Data_Items, setData_Items] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("Data_Items");
      const parsed = stored ? JSON.parse(stored) : [];
      return parsed?.length > 0 ? parsed : [...fakeData];
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
  const onSubmitData = (data) => {
      const { patientName, assignedDoctor } = data;
      console.log(data);
  
      const p_name = patientItems.find((item) => item.id == patientName);
      const doc_name = DoctorNames.find((item) => item.id == assignedDoctor);
  
      if (selectedRow) {
        const updatedData = {
          ...data,
          patientName: p_name?.name ?? patientName,
          assignedDoctor: doc_name?.name ?? assignedDoctor,
        };
  
        const updatedItems = Data_Items.map((item) =>
          item.id === selectedRow.id ? { ...item, ...updatedData } : item
        );
  
        setData_Items(updatedItems);
      } else {
        const uniqueId =
          Date.now().toString(36) + Math.random().toString(36).substring(2);
  
        const newData = {
          ...data,
          id: uniqueId,
          patientName: p_name?.name ?? data.patientName,
          assignedDoctor: doc_name?.name ?? data.assignedDoctor,
        };
  
        setData_Items((prev) => [...prev, newData]);
      }
  
      setopen(false);
      form.reset(defaultValues);
      setSelectedRow(null);
    };

  const contextValue = {
    Data_Items,
    setData_Items,
    localClear,
    onSubmitData,
    selectedRow,
    setSelectedRow,
    open,
    setopen,
    mbId, setmbId
  };
   
  return (
    <DocContext.Provider value={contextValue}>
      {children}
    </DocContext.Provider>
  );
};

export const useDocContext = () => useContext(DocContext);
