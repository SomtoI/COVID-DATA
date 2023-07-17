import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { GraphProps } from '../../utils/types';

const LineChartGraphComponent: React.FC<GraphProps> = ({ tableData }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Clear the container element before rendering the chart
      containerRef.current.innerHTML = '';

      // Set up dimensions
      const width = 500;
      const height = 300;
      const margin: { top: number; right: number; bottom: number; left: number } = { top: 20, right: 20, bottom: 30, left: 50 };
      const graphWidth: number = width - margin.left - margin.right;
      const graphHeight: number = height - margin.top - margin.bottom;

      // Filter out data points with missing or invalid values
      const filteredData = tableData.filter((d) => !isNaN(d.total_metric));

      // Format the date
      const parseDate: d3.TimeParse = d3.timeParse('%Y-%m-%d');
      filteredData.forEach((d: { date: string }) => {
        d.date = parseDate(d.date) as Date;
      });

      // Set up scales
      const xScale: d3.ScaleTime<number, number> = d3
        .scaleTime()
        .domain(d3.extent(filteredData, (d: { date: Date }) => d.date) as [Date, Date])
        .range([0, graphWidth]);
      const yScale: d3.ScaleLinear<number, number> = d3
        .scaleLinear()
        .domain([0, d3.max(filteredData, (d: { total_metric: number }) => d.total_metric) as number])
        .range([graphHeight, 0]);

      // Set up line generator
      const line: d3.Line<{ date: Date; total_metric: number }> = d3
        .line<{ date: Date; total_metric: number }>()
        .defined((d) => !isNaN(d.total_metric))
        .x((d: { date: Date }) => xScale(d.date) as number)
        .y((d: { total_metric: number }) => yScale(d.total_metric) as number);

      // Create SVG and transform
      const svg: d3.Selection<SVGSVGElement, unknown, null, undefined> = d3
        .select(containerRef.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // Draw line
      svg
        .append('path')
        .datum(filteredData)
        .attr('class', 'line')
        .attr('d', line);

      // Draw x-axis
      svg
        .append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${graphHeight})`)
        .call(d3.axisBottom<Date>(xScale));

      // Draw y-axis
      svg.append('g').attr('class', 'y-axis').call(d3.axisLeft<number>(yScale));
    }
  }, [tableData]);

  return <div ref={containerRef} id="line-graph-container" />;
};

export default LineChartGraphComponent;
