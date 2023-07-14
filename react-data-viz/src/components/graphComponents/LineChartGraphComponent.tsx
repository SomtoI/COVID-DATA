import React from 'react';
import { GraphProps } from '../../utils/types';

const LineChartGraphComponent: React.FC<GraphProps> = ({ baselineData, comparisonData }) => {
  // Use the 'baselineData' and 'comparisonData' to render a line chart that compares the two datasets

  return (
    <div>
      {baselineData}
      {comparisonData}
    </div>
  );
};

export default LineChartGraphComponent;
