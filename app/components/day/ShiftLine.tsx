import type { ShiftBlockType } from "@/app/types/ShiftBlockType";
import { NowPageTime } from "@/app/types/NowPageTime";
import { Role } from "@prisma/client";
import UserShiftBlock from "./UserShiftBlock";
import AdminShiftBlock from "./AdminShiftBlock";
import { Session } from "next-auth";

interface ShiftLineProps {
  deviceNames: string[];
  deviceName: string;
  shiftBlocks: ShiftBlockType[];
  calcBlockPosition: (
    startTime: Date,
    endTime: Date
  ) => { top: number; left: number; height: number };
  nowPageTime: NowPageTime;
  session: Session | null;
}

function ShiftLine({
  deviceNames,
  deviceName,
  shiftBlocks,
  calcBlockPosition,
  nowPageTime,
  session,
}: ShiftLineProps) {
  let role: Role;
  if (session?.user.role === Role.ADMIN) {
    role = session.user.role;
  } else if (session?.user.role === Role.USER) {
    role = session.user.role;
  }

  return (
    <div className="w-full flex flex-col relative">
      {/* ShiftLineの仕切り線 */}

      {shiftBlocks.map((userInput: ShiftBlockType, index: number) => {
        const { top, left, height } = calcBlockPosition(
          userInput.startTime,
          userInput.endTime
        );

        return (
          userInput.selectedDevice === deviceName &&
          (role === "USER" ? (
            <UserShiftBlock
              userInput={userInput}
              deviceNames={deviceNames}
              nowPageTime={nowPageTime}
              top={top}
              height={height}
              left={left}
              index={index}
              shiftBlocks={shiftBlocks}
            />
          ) : (
            <AdminShiftBlock
              userInput={userInput}
              shiftBlocks={shiftBlocks}
              top={top}
              height={height}
              left={left}
              index={index}
            />
          ))
        );
      })}
    </div>
  );
}

export default ShiftLine;
