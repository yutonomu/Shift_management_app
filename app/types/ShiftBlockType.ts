export type ShiftBlockType = {
  name: string;
  selectedDevice: string;
  startTime: Date;
  endTime: Date;
  color: string;
  id: string;
  userId: string;
  // defaultDevice: string; // ユーザーが設定したデフォルトのデバイス名
  // project: string;
  // isOverlap: string | null; // 重複しているShiftBlockのID. 重複していない場合はnull
};
