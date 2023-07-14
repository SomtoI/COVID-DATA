/* eslint-disable @typescript-eslint/no-explicit-any */
import LineChartGraphComponent from "../components/graphComponents/LineChartGraphComponent";

export interface DataResponse {
    categories: {
        countries: string[];
        continents: string[];
      };
    metrics: string[];
  }

export interface TableResponse {
  success: boolean;
  message?: string;
  data?: any[];
}

export interface GraphData<TProps> {
    id: string;
    component: React.FC<TProps>;
}

export interface GraphProps {
  baselineData: string;
  comparisonData: string;
}

export type MyProps = GraphProps;

export const graphs: GraphData<MyProps>[] = [{
  id: 'linegraph',
  component: LineChartGraphComponent,
}]




  