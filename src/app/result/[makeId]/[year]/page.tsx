'use client'

import { useState, useEffect, SetStateAction, Suspense } from 'react'
import { Input } from '@/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'

interface CarMake {
    MakeId: number
    MakeName: string
    VehicleTypeId: number
    VehicleTypeName: string
}

export default function HomePage() {
    const [carMakes, setCarMakes] = useState<CarMake[]>([])
    const [filteredMakes, setFilteredMakes] = useState<CarMake[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCarMakes = async () => {
            try {
                const response = await fetch(
                    'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
                )
                if (!response.ok) {
                    throw new Error('Failed to fetch car makes')
                }
                const data = await response.json()
                setCarMakes(data.Results)
                setFilteredMakes(data.Results)
            } catch (err) {
                setError('An error occurred while fetching car makes')
            } finally {
                setIsLoading(false)
            }
        }

        fetchCarMakes()
    }, [])

    useEffect(() => {
        const filtered = carMakes.filter((make) =>
            make.MakeName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredMakes(filtered)
    }, [searchTerm, carMakes])

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>
    }

    return (
        <Suspense fallback={<div>Loading vehicle models...</div>}>
            <div className="h-screen container mx-auto p-4">
                <Card className='h-full'>
                    <CardHeader className='h-[20%]'>
                        <CardTitle className="text-3xl font-bold text-center mb-4">Car Makes</CardTitle>
                        <Input
                            type="text"
                            placeholder="Search car makes..."
                            value={searchTerm}
                            onChange={(e: { target: { value: SetStateAction<string> } }) => setSearchTerm(e.target.value)}
                            className="mb-4"
                        />
                    </CardHeader>
                    <CardContent className='h-[80%] overflow-y-scroll'>
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredMakes.map((make) => (
                                <li key={make.MakeId} className="bg-gray-100 p-4 rounded-lg shadow">
                                    <h2 className="text-xl font-semibold">{make.MakeName}</h2>
                                    <p className="text-sm text-gray-600">{make.VehicleTypeName}</p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </Suspense>
    )
}