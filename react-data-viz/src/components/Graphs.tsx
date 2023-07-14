/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { GraphData, MyProps } from '../utils/types';

interface GraphicsProps {
  graphs: GraphData<MyProps>[];
  baselineData: string;
  comparisonData: string;
  
}

const Graphs: React.FC<GraphicsProps> = ({graphs, baselineData, comparisonData}) => {
  return (
    <div>
      {graphs.map(({ id, component: GraphComponent }) => (
        <GraphComponent
          key={id}
          baselineData={baselineData}
          comparisonData={comparisonData}
        />
      ))}
    </div>
  );
};

export default Graphs;
