import { Devices } from "@prisma/client";

// マッピング：Enumの値と日本語ラベルの対応
export const deviceLabelMap: Record<Devices, string> = {
  [Devices.WHITE_PC]: "白PC",
  [Devices.BLACK_PC]: "黒PC",
  [Devices.LAPTOP]: "ノートPC",
  [Devices.MAC1]: "Mac1",
  [Devices.MAC2]: "Mac2",
};
