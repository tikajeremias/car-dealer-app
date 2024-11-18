'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Loader2 } from 'lucide-react';

interface VehicleModel {
    Make_ID: number;
    Make_Name: string;
    Model_Name: string;
    Model_ID: number;
}

export default function VehicleResults() {
    const params = useParams();
    const { makeId, year } = params as { makeId: string; year: string };
    const [models, setModels] = useState<VehicleModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVehicleModels = async () => {
            try {
                const response = await fetch(
                    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch vehicle models');
                }
                const data = await response.json();
                setModels(data.Results);
            } catch (err) {
                setError('An error occurred while fetching vehicle models');
            } finally {
                setIsLoading(false);
            }
        };

        if (makeId && year) {
            fetchVehicleModels();
        }
    }, [makeId, year]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="h-screen container mx-auto p-4">
            <Card className="h-full">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">
                        Vehicle Models
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-[80%] overflow-y-scroll">
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {models.map((model) => (
                            <li
                                key={model.Model_ID}
                                className="bg-gray-100 p-4 rounded-lg shadow"
                            >
                                <h2 className="text-xl font-semibold">{model.Make_Name}</h2>
                                <h2 className="text-md font-regular">{model.Model_Name}</h2>
                                <h2 className="text-xs font-extralight">{model.Model_ID}</h2>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
