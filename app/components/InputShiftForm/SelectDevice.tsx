import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Image from "next/image";

interface SelecteDeviceProps {
  deviceNames: string[];
  defaultDeviceName?: string | null;
}

function SelecteDevice({deviceNames, defaultDeviceName}: SelecteDeviceProps): JSX.Element {
  {
    const selectContents = () => {
      return (
        <div>
          {deviceNames.map((deviceName) => (
            <SelectItem key={deviceName} value={deviceName}>
              {deviceName}
            </SelectItem>
          ))}
        </div>
      );
    };
    const placeholder: string = defaultDeviceName
      ? defaultDeviceName
      : "デバイス名を選択";
    return (
      <div className="flex justify-between items-center m-3">
        <Image
          src="/Icons/bi_pc-display-horizontal.svg"
          alt="device"
          width={100}
          height={100}
        />
        <Select>
          <SelectTrigger className="w-[50vw]">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>{selectContents()}</SelectContent>
        </Select>
      </div>
    );
  }
}

export default SelecteDevice;
