export type ShiftBlockType = {
  name: string;
  selectedDevice: string;
  startTime: string;
  endTime: string;
  color: string;
  // defaultDevice: string; // ユーザーが設定したデフォルトのデバイス名
  // shiftBlockId: string;
  // project: string;
  // isOverlap: string | null; // 重複しているShiftBlockのID. 重複していない場合はnull
};
