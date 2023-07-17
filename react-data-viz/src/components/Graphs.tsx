/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { GraphData, GraphProps } from '../utils/types';
import { useTableData } from '../utils/TableDataContext';
interface GraphicsProps {
  graphs: GraphData<GraphProps>[];
}

const Graphs: React.FC<GraphicsProps> = ({graphs}) => {
  const { tableData } = useTableData();
  return (
    <div>
      {graphs.map(({ id, component: GraphComponent }) => (
        <GraphComponent
          key={id}
          tableData={tableData}
        />
      ))}
    </div>
  );
};

export default Graphs;
