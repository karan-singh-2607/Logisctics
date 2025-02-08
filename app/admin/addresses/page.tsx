'use client'

import { useState } from 'react'
import { AddressDetails } from './components/address-details'
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/toaster"

const addressData = {
  usa: [
    { label: 'Name', value: 'teona Kvesadze' },
    { label: 'Address 1', value: '8 McCullough Dr. UNIT U126388' },
    { label: 'City', value: 'New Castle' },
    { label: 'State', value: 'DE' },
    { label: 'ZIP', value: '19720' },
    { label: 'Country', value: 'USA' },
    { label: 'Tel', value: '+1(866) 411-9401' },
  ],
  turkey: [
    { label: 'Name', value: 'teona Kvesadze' },
    { label: 'Address 1', value: 'Mahmutbey Mah. Taşocağı Yolu Cad.' },
    { label: 'Address 2', value: 'No:3 Kat:1 Bağcılar' },
    { label: 'City', value: 'Istanbul' },
    { label: 'ZIP', value: '34218' },
    { label: 'Country', value: 'Turkey' },
    { label: 'Tel', value: '+90 212 809 11 11' },
  ],
  china: [
    { label: 'Name', value: 'teona Kvesadze' },
    { label: 'Address 1', value: 'Room 1601, No. 6, Lane 3611' },
    { label: 'Address 2', value: 'Zhangyang Road, Pudong New Area' },
    { label: 'City', value: 'Shanghai' },
    { label: 'ZIP', value: '200136' },
    { label: 'Country', value: 'China' },
    { label: 'Tel', value: '+86 21 6045 2100' },
  ],
}

export default function AddressesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Addresses</h1>
        <Button className="bg-secondary hover:bg-secondary/90 text-white">Edit</Button>
      </div>

      <Tabs defaultValue="usa" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="usa" className="data-[state=active]:bg-secondary data-[state=active]:text-white">USA</TabsTrigger>
          <TabsTrigger value="turkey" className="data-[state=active]:bg-secondary data-[state=active]:text-white">Turkey</TabsTrigger>
          <TabsTrigger value="china" className="data-[state=active]:bg-secondary data-[state=active]:text-white">China</TabsTrigger>
        </TabsList>
        <TabsContent value="usa">
          <AddressDetails fields={addressData.usa} />
        </TabsContent>
        <TabsContent value="turkey">
          <AddressDetails fields={addressData.turkey} />
        </TabsContent>
        <TabsContent value="china">
          <AddressDetails fields={addressData.china} />
        </TabsContent>
      </Tabs>

      <Toaster />
    </div>
  )
}

