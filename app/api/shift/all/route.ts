import { ShiftBlockType } from "@/app/types/ShiftBlockType";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { deviceLabelMap } from "@/app/types/devices";

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const shiftAllData = await prisma.shift.findMany({
      select: {
        selectedDevice: true,
        startTime: true,
        endTime: true,
        user: {
          select: {
            name: true,
            color: true,
          },
        },
      },
    });

    // ShiftBlockTypeに合わせてデータを変換しつつ、日本語ラベルに変換
    const formattedShiftData: ShiftBlockType[] = shiftAllData.map((shift) => {
      return {
        name: shift.user.name,
        selectedDevice: deviceLabelMap[shift.selectedDevice], // 日本語に変換
        startTime: shift.startTime.toString(),
        endTime: shift.endTime.toString(),
        color: shift.user.color,
      };
    });

    return NextResponse.json(formattedShiftData, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch shifts:", error);
    return NextResponse.json(
      { error: "Failed to fetch shifts" },
      { status: 500 }
    );
  }
}
