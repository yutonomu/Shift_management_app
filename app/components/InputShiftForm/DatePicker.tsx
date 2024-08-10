"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ja } from "date-fns/locale";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>(new Date());

  const formatMonthYear = (date: Date) => {
    return format(date, "yyyy年M月", { locale: ja });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {date ? (
            format(date, "PPP(E)", { locale: ja })
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ja}
          formatMonthYear={formatMonthYear}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
