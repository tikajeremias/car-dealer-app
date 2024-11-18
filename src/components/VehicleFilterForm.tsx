'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useVehicleMakes from '../hooks/useVehicleMakes';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
import { Button } from '@/ui/button';
import { Loader2 } from 'lucide-react';

export default function VehicleFilterForm() {
  const { makes, loading, error } = useVehicleMakes();
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const router = useRouter();

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 + 1 },
    (_, i) => currentYear - i
  );

  const handleNextClick = () => {
    if (selectedMake && selectedYear) {
      // Redirigimos a la página de resultados con makeId y year
      router.push(`/result/${selectedMake}/${selectedYear}`);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Vehicle Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading && (
          <div className="flex justify-center items-center py-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        {!loading && !error && (
          <>
            <div className="space-y-2">
              <label
                htmlFor="make"
                className="text-sm font-medium text-gray-700"
              >
                Select Make
              </label>
              <Select onValueChange={setSelectedMake} value={selectedMake}>
                <SelectTrigger id="make">
                  <SelectValue placeholder="Select a make" />
                </SelectTrigger>
                <SelectContent>
                  {makes.map((make: any) => (
                    <SelectItem
                      key={make.MakeId}
                      value={make.MakeId.toString()}
                    >
                      {make.MakeName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="year"
                className="text-sm font-medium text-gray-700"
              >
                Select Year
              </label>
              <Select onValueChange={setSelectedYear} value={selectedYear}>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select a year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleNextClick}
          disabled={!selectedMake || !selectedYear || loading}
          className="w-full"
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
