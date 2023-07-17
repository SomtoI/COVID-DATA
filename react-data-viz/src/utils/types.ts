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
  data: GraphProps;
}

export interface GraphData<TProps> {
    id: string;
    component: React.FC<TProps>;
}

export type GraphProps = { [key: string]: any }[];


export type MyProps = GraphProps;

export const graphs: GraphData<GraphProps>[] = [{
  id: 'linegraph',
  component: LineChartGraphComponent,
}]




  