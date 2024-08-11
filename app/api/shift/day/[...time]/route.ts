import { ShiftBlockType } from "@/app/types/ShiftBlockType";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { time: string } }
): Promise<NextResponse> {
  const date = new Date(params.time);
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];

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
    const shiftDayData = await prisma.shift.findMany({
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

    // // ShiftBlockTypeに合わせてデータを変換
    const shiftDayBlocks: ShiftBlockType[] = shiftDayData.map((shift) => {
      return {
        name: shift.user.name,
        selectedDevice: shift.selectedDevice, // 日本語に変換
        startTime: shift.startTime,
        endTime: shift.endTime,
        color: shift.user.color,
      };
    });

    console.log("shiftDayBlocks:", shiftDayBlocks);

    return NextResponse.json(shiftDayBlocks, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch shifts:", error);
    return NextResponse.json(
      { error: "Failed to fetch shifts" },
      { status: 500 }
    );
  }
}
