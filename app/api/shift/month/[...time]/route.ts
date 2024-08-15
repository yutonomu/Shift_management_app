import { ShiftBlockType } from "@/app/types/ShiftBlockType";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { time: string } }
): Promise<NextResponse> {
  const date = new Date(params.time);
  const [year, month] = [date.getFullYear(), date.getMonth() + 1];

  if (isNaN(year) || isNaN(month)) {
    return NextResponse.json(
      { error: "Invalid year, month, or day" },
      { status: 400 }
    );
  }
  // 月の開始と終了時間を計算
  const startDate = new Date(year, month - 1, 1, 0, 0, 0); // 月の1日
  const endDate = new Date(year, month, 0, 23, 59, 59); // 次の月の0日は前の月の最終日

  try {
    const shiftMonthData = await prisma.shift.findMany({
      where: {
        startTime: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        id: true,
        selectedDevice: true,
        startTime: true,
        endTime: true,
        isOverlapShiftId: true,
        user: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    });

    // // ShiftBlockTypeに合わせてデータを変換
    const shiftMonthBlocks: ShiftBlockType[] = shiftMonthData.map((shift) => {
      return {
        id: shift.id,
        userId: shift.user.id,
        name: shift.user.name,
        selectedDevice: shift.selectedDevice,
        startTime: shift.startTime,
        endTime: shift.endTime,
        isOverlapShiftId: Array.isArray(shift.isOverlapShiftId)
          ? (shift.isOverlapShiftId as string[]) // 型アサーションを使用してstring[]に変換
          : [], // isOverlapShiftId が null でないことを確認し、空配列を返す
        // isOverlapShiftId: shift.isOverlapShiftId,
        color: shift.user.color,
      };
    });

    console.log("shiftMonthBlocks:", shiftMonthBlocks);

    return NextResponse.json(shiftMonthBlocks, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch shifts:", error);
    return NextResponse.json(
      { error: "Failed to fetch shifts" },
      { status: 500 }
    );
  }
}
