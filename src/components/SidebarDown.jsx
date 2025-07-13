import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import Image from 'next/image'
import name from '../../public/vecteezy_young-female-doctor-smiling-with-confidence-and-positivity_47426880.png';
const SidebarDown = ({ setOpen, reset }) => {
    return (
        <div className=" grid grid-cols-1 gap-4 px-4 lg:px-6" >
            <Card style={{ backgroundColor: 'var(--SidebarDown)' }} className="@container/card bg-SidebarDown lg:relative lg:overflow-hidden ">
                <CardHeader>
                    <CardTitle className=" font-semibold text-white tabular-nums @[250px]/card:text-2xl">
                        Want to Check All The Appointments  ?
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between ">
                        <div>
                            <CardDescription className="text-md ms-1" style={{ color: 'var(--sidedownText)' }}>
                                This Is The Place Where You <br />
                                Need <br /> We do the Rest.
                            </CardDescription>
                            <Button onClick={() => {
                                setOpen(true);
                                reset();
                            }} className="lg:mt-6 mt-2" variant="outline">
                                Add Appointment
                            </Button >
                        </div>
                        <div className='lg:flex hidden'><Image className='z-99 lg:mr-6 lg:absolute lg:right-0 lg:bottom-0 contain-content object-contain object-center' src={name} width={220} alt="image" /></div>

                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default SidebarDown
