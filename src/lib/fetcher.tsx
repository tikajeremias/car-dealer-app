"use client"
// src/app/index.js
import { useState } from 'react';
import useVehicleMakes from '../hooks/useVehicleMakes';
import { useRouter } from 'next/navigation';

export default function FilterPage() {
    const { makes, loading, error } = useVehicleMakes();
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const router = useRouter();

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2014 }, (_, i) => currentYear - i);

    const handleNextClick = () => {
        if (selectedMake && selectedYear) {
            router.push(`/result/${selectedMake}/${selectedYear}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Car Dealer Filter</h1>

            {loading && <p>Loading makes...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="w-full max-w-xs mb-4">
                <select
                    className="w-full p-2 border rounded mb-2"
                    value={selectedMake}
                    onChange={(e) => setSelectedMake(e.target.value)}
                >
                    <option value="">Select Vehicle Make</option>
                    {makes.map((make) => (
                        //@ts-expect-error
                        <option key={make.MakeId} value={make.MakeId}>{make.MakeName}</option>
                    ))}
                </select>

                <select
                    className="w-full p-2 border rounded mb-2"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="">Select Model Year</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={handleNextClick}
                className={`p-2 w-full max-w-xs rounded ${selectedMake && selectedYear ? 'bg-blue-500' : 'bg-gray-300 cursor-not-allowed'
                    } text-white`}
                disabled={!selectedMake || !selectedYear}
            >
                Next
            </button>
        </div>
    );
}
