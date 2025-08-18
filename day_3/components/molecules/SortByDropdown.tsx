import { SortByDropdownProps, SortByOption } from "@/utils/types";
import Dropdown from "../atoms/Dropdown";

const SortByDropdown = ({ value, onChange }: SortByDropdownProps) => {
    const optionsMap: Record<SortByOption, string> = {
        newest: 'Newest',
        oldest: 'Oldest',
        priorityHighLow: 'Priority High → Low',
        priorityLowHigh: 'Priority Low → High',
    };

    return (
        <Dropdown
            style={{ width: 150 }}
            options={Object.values(optionsMap)}
            selected={optionsMap[value]}
            onSelect={(val) => {
                const key = (Object.keys(optionsMap) as SortByOption[]).find(
                    (k) => optionsMap[k] === val
                );
                if (key) onChange(key);
            }}
            placeholder="Sort by"
        />
    );
};

export default SortByDropdown;