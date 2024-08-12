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

export const postShift = async ({
  selectedDevice,
  startTime,
  endTime,
}: z.infer<typeof shiftFromSchema>) => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  try {
    const newShift = await prisma.shift.create({
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

    // シフト作成が成功した場合、成功メッセージを返す
    return { success: true, shift: newShift };
  } catch (error) {
    console.error("Error creating shift:", error);
  }
};
