"use client";

import { Button } from "@nextui-org/react";

type FilterType = "all" | "featured" | "discount";

type FilterControlsProps = {
    filterType: FilterType;
    setFilterType: (type: FilterType) => void;
};

const FilterControls = ({ filterType, setFilterType }: FilterControlsProps) => {
    return (
        <div className="mt-6 flex justify-center gap-4">
            {(["all", "featured", "discount"] as FilterType[]).map((type) => (
                <Button
                    key={type}
                    variant={filterType === type ? "solid" : "bordered"}
                    onClick={() => setFilterType(type)}
                    size="sm"
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
            ))}
        </div>
    );
};

export default FilterControls;
