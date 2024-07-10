// @refresh reset
"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Cell, Label, Legend, Pie, PieChart, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TbCup } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";

const chartData = [
  { browser: "Purchased", visitors: 2, fill: "#1D4D4F" },
  { browser: "Started", visitors: 2, fill: "gray" },
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
export default function Chart() {
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
                        className="fill-darkGreen font-bold text-xl"
                      >
                        {started.toLocaleString()}/{purchased}
                        {/* <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-3xl fill-darkGreen font-bold"
                        >
                          <TbCup />
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-darkGreen"
                        >
                          {chartData[1].visitors.toLocaleString()}/
                          {totalVisitors}
                        </tspan> */}
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
                <FaRegStar className="text-2xl text-[#C1A063] font-bold" />
                <span className="text-2xl font-bold">
                  {started.toLocaleString()}
                </span>
              </div>
              <span className="font-semibold">Started</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-x-2">
                <TbCup className="text-2xl text-darkGreen" />
                <span className="text-2xl font-bold">{purchased}</span>
              </div>
              <span className="font-semibold">Purchased</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
    // <PieChart width={400} height={400}>
    //   <Pie
    //     data={data}
    //     cx={200}
    //     cy={200}
    //     innerRadius={60}
    //     outerRadius={80}
    //     fill="#8884d8"
    //     paddingAngle={5}
    //     dataKey="value"
    //   >
    //     {data.map((entry, index) => (
    //       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    //     ))}
    //     <Label
    //       value={`${data.reduce((acc, entry) => acc + entry.value, 0)}`}
    //       position="center"
    //       style={{
    //         fontSize: "24px",
    //         fontWeight: "bold",
    //         fill: "red",
    //       }}
    //     />{" "}
    //   </Pie>
    //   <Tooltip />
    // </PieChart>
  );
}
