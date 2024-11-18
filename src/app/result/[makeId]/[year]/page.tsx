'use client';

import VehicleResults from '@/components/VehicleResults';
import { Suspense } from 'react';

export default function Page() {

    return (
        <Suspense fallback={<div>Loading vehicle models...</div>}>
            <VehicleResults />
        </Suspense>
    );
}
