"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import SidebarDown from "@/components/SidebarDown";
import { MyCalendar } from "@/components/calender";
import { MobileCalendar } from "../../components/MbCalender";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { SearchableSelect } from "@/components/searchableselect";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DoctorNames, patientItems } from "../data";
import { useDocContext } from "../context/MyContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar24 } from "@/components/Calendar24";

export default function Page() {


  const { Data_Items, mbId, localClear, onSubmitData, selectedRow, setSelectedRow, open, setopen } = useDocContext();


  const Data = z.object({
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    patientName: z.string().min(1, "Patient name is required"),
    assignedDoctor: z.string().min(1, "Doctor name is required"),
    status: z.string().min(1, "Status is required"),
  });
  const defaultValues = {

    date: "",
    patientName: "",
    assignedDoctor: "",
    status: "Pending",
    time: "10:30:00",
  };
  const form = useForm({
    resolver: zodResolver(Data),
    defaultValues,
  });
  console.log(form.watch("date"));

  const handleEdit = (id) => {
    setopen(true);
    console.log(id);
    const row = Data_Items.find((item) => item.id === id);
    console.log("row", row);

    setSelectedRow(row);
    if (row) {
      form.setValue("date", row.date);
      form.setValue("patientName", row.patientName);
      form.setValue("assignedDoctor", row.assignedDoctor);
      form.setValue("status", row.status);
      form.setValue("time", row.time);


    }
  }

const handleMbSet =(id)=>{
 console.log(id);
    const row = Data_Items.find((item) => item.id === id);
    console.log("row", row);

    setSelectedRow(row);
    if (row) {
      form.setValue("date", row.date);
      form.setValue("patientName", row.patientName);
      form.setValue("assignedDoctor", row.assignedDoctor);
      form.setValue("status", row.status);
      form.setValue("time", row.time);


    }
}

  console.log(form.watch("time"));
  const onSubmit = (data) => {
    onSubmitData(data)
  }



  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className=" fixed top-0 md:static w-full  lg:static"><SiteHeader /></div>
        <div className="flex mt-5 md:mt-0 flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 w-full py-4 md:gap-6 md:py-6">
              <SidebarDown setOpen={setopen} reset={form.reset} />
              <SectionCards />
              <div className=" hidden md:block">
                <MyCalendar
                  setOpen={setopen}
                  setMyDate={(date) => {
                    if (date) {
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      const day = String(date.getDate()).padStart(2, '0');
                      const localDate = `${year}-${month}-${day - 1}`;
                      form.setValue("date", localDate);
                    }
                  }}
                  setValue={(data) => {
                    form.setValue("patientName", data.patientName)
                    form.setValue("assignedDoctor", data.assignedDoctor)
                    setSelectedRow(data)
                  }}


                  setEmpty={() =>
                    form.setValue("patientName", "") &
                    form.setValue("assignedDoctor", "")
                  }
                />
              </div>
              <button className="mt-2 underline text-blue-500" onClick={localClear}>clear</button>
              <div className="block md:hidden ">
                <MobileCalendar handleMbSet={handleMbSet} setMyDate={(date) => { form.setValue("date", date) }} setOpen={setopen} />
              </div>
              <div className="px-4 lg:px-6"></div>
              {Data_Items.length > 0 && (
                <DataTable data={Data_Items} onEdit={handleEdit} />
              )}
            </div>
          </div>
          <Dialog
            key={selectedRow?.id || "new"} // 
            open={open}
            onOpenChange={(val) => {
              setopen(val);
              if (!val) {
                form.reset(defaultValues); // 
                setSelectedRow(null);
              }
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Appointments</DialogTitle>
                <DialogDescription>
                  Editing details for patient:{" "}
                  <strong>{selectedRow?.patientName}</strong>
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full gap-4">
                <div className="flex flex-col items-start gap-4 w-full">
                  <Label htmlFor="link">Select Date</Label>
                  <p>{form.formState.errors.date?.message}</p>
                  <Calendar24
                    onValueChange={(val) => form.setValue("time", val)}
                    date={form.watch("date") ? new Date(form.watch("date")) : undefined}
                    setDate={(selectedDate) => {
                      console.log(selectedDate);

                      if (selectedDate) {
                        const year = selectedDate.getFullYear();
                        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                        const day = String(selectedDate.getDate()).padStart(2, '0');
                        const localDate = `${year}-${month}-${day}`;
                        form.setValue("date", localDate);
                      }
                    }}
                  />

                </div>
                <div className="flex flex-col items-start gap-4 w-full">
                  <Label htmlFor="link">Select Doctor</Label>
                  <SearchableSelect
                    items={DoctorNames}
                    placeholder="Select a doctor"
                    value={form.watch("assignedDoctor") || ""}
                    onValueChange={(val) =>
                      form.setValue("assignedDoctor", val)
                    }
                  />
                </div>
                <div className="flex flex-col items-start gap-4 w-full">
                  <Label htmlFor="link">Select patient</Label>
                  <SearchableSelect
                    items={patientItems}
                    placeholder="Select a patient"
                    value={form.watch("patientName") || ""}
                    onValueChange={(val) => form.setValue("patientName", val)}
                  />
                </div>
                <div className="flex items-end  gap-4 w-full">
                  <Select onValueChange={(val) => form.setValue("status", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" type="submit">
                  Submit
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
