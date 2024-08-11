export type ShiftBlockType = {
  name: string;
  selectedDevice: string;
  startTime: Date;
  endTime: Date;
  color: string;
  // shiftBlockId: string;
  // project: string;
  // isOverlap: string | null; // 重複しているShiftBlockのID. 重複していない場合はnull
};
