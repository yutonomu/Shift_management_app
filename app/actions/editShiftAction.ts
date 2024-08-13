"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { Devices } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { nextAuthOptions } from "@/lib/next-auth/options";

const shiftFromSchema = z
  .object({
    selectedDevice: z.string().min(1, "デバイス名を入力してください"),
    startTime: z.date(),
    endTime: z.date(),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "終了時刻は開始時刻より後にしてください",
    path: ["endTime"],
  });

export const editShift = async ({
  userId,
  shiftId,
  selectedDevice,
  startTime,
  endTime,
}: {
  userId: string;
  shiftId: string; // ここで型定義を行います
  selectedDevice: string;
  startTime: Date;
  endTime: Date;
}) => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  // バリデーションを実行
  const validationResult = shiftFromSchema.safeParse({
    selectedDevice,
    startTime,
    endTime,
  });
  console.log(selectedDevice, startTime, endTime);

  if (!validationResult.success) {
    throw new Error("Validation failed: " + validationResult.error.message);
  }

  try {
    const editShift = await prisma.shift.update({
      where: {
        id: shiftId,
      },
      data: {
        selectedDevice: selectedDevice as Devices,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    console.log("Shift updated successfully", editShift);

    // シフトの編集が成功した場合、成功メッセージを返す
    return { success: true, shift: editShift };
  } catch (error) {
    console.error("Error creating shift:", error);
  }
};
