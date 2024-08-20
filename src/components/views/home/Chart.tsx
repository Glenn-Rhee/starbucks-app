// @refresh reset
"use client";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TbCup } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { User } from "@prisma/client";

interface DataUser extends User {
  totalPurchased: number;
  favorited: number;
}

interface ChartProps {
  data: DataUser;
}
export default function Chart(props: ChartProps) {
  const { data } = props;

  const chartData = [
    { browser: "Purchased", visitors: data.totalPurchased, fill: "#1D4D4F" },
    { browser: "Favorited", visitors: data.favorited, fill: "gray" },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const purchased = chartData[0].visitors;
  const started = chartData[1].visitors;

  return (
    <Card className="flex rounded-3xl flex-col items-center mt-5 relative">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square w-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={1}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-darkGreen font-bold text-2xl"
                      >
                        {started.toLocaleString()}/{purchased}
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex w-full">
        <div className="flex flex-col justify-between w-full items-end">
          <div className="flex justify-evenly w-full text-dark gap-x-2">
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center gap-x-2">
                <FaRegStar className="text-xl text-[#C1A063] font-bold" />
                <span className="text-xl font-bold">
                  {started.toLocaleString()}
                </span>
              </div>
              <span className="font-semibold">Favorited</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-x-2">
                <TbCup className="text-xl text-darkGreen" />
                <span className="text-xl font-bold">{purchased}</span>
              </div>
              <span className="font-semibold">Purchased</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
