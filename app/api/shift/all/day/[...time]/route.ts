import { ShiftBlockType } from "@/app/types/ShiftBlockType";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { deviceLabelMap } from "@/app/types/devices";

export async function GET(
  req: Request,
  { params }: { params: { time: string } }
): Promise<NextResponse> {
  const [year, month, day] = new Date(params.time)
    .toLocaleDateString()
    .split("/")
    .map(Number);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return NextResponse.json(
      { error: "Invalid year, month, or day" },
      { status: 400 }
    );
  }

  // 日の開始と終了時間を計算
  const startDate = new Date(year, month - 1, day, 0, 0, 0);
  const endDate = new Date(year, month - 1, day, 23, 59, 59);

  try {
    const shiftAllData = await prisma.shift.findMany({
      where: {
        startTime: {
          gte: startDate,
          lte: endDate,
        },
      },
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
