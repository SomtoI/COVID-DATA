import React, { useState, useEffect } from 'react';
import Metrics from './Metrics';
import Graphs from './Graphs';
import { graphs, DataResponse, TableResponse } from '../utils/types';
import axios, {AxiosResponse} from 'axios';

const GraphParent: React.FC = () => {
  const [categories, setCategories] = useState<{ countries: string[]; continents: string[] }>({
    countries: [],
    continents: [],
  });
  const [metrics, setMetrics] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [baselineValue, setBaselineValue] = useState('');
  const [comparisonValue, setComparisonValue] = useState('');
  const [metric, setMetric] = useState('');
  const [showGraphs, setShowGraphs] = useState(false);

  useEffect((): void => {
    // Fetch category and metric data from backend API
    const cachedData = localStorage.getItem('selectData');
    if (cachedData) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { categories, metrics } = JSON.parse(cachedData);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setCategories(categories);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setMetrics(metrics);
    } else {
      void fetchData(); // Fetch data from backend API if not available in cache
    }

  }, []);

  const fetchData = async () => {
    try {
      const response: AxiosResponse<DataResponse> = await axios.get('http://localhost:4000/api/data');
      const { categories, metrics } = response.data;
      setCategories(categories);
      setMetrics(metrics);

      localStorage.setItem('selectData', JSON.stringify({ categories, metrics }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCategoryChange = (category: string, value: string) => {
    setCategory(category);
    setBaselineValue(value);
    
  };

  const handleMetricChange = (value: string) => {
    setMetric(value);
    
  };
  
  const handleComparisonChange = (value: string) => {
    setComparisonValue(value);
    
  };
  
  const handleDataRetrieve = async (
    category: string,
    baseValue: string,
    metric: string,
    comparisonValue?: string
  ) => {
    try {
      const response: AxiosResponse<TableResponse> = await axios.get('/api/data/getGraphData', {
        params: {
          category,
          baseValue,
          comparisonValue,
          metric
        }
      });
      setShowGraphs(true);
      console.log(response.data);
    } catch (error) {
      console.error('Error retrieving table data:', error);
      console.log(error);
      //   success: false,
      //   message: 'Error retrieving table data'
      // };
    }
  };

  /*const handleDataRetrieve = () => {
    // Call your backend API to retrieve data based on baseline and comparison inputs
    // Pass the retrieved data to the respective graph components
    // Update the 'graphs' state with the graph data

    // Example of retrieving data for a single graph
    try {
      const response = await axios.get<TableResponse>('/api/getGraphData');
      console.log('Data response:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setShowGraphs(true);
  };*/

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ paddingRight: '20px' }}>
          <h2>Metrics</h2>
          <Metrics
            categories={categories}
            metrics={metrics}
            onCategoryChange={handleCategoryChange}
            onMetricChange={handleMetricChange}
            onComparisonValueChange ={handleComparisonChange}
          />
        </div>
        
      </div>
      <button
        style={{
          backgroundColor: '#eaeaea',
          color: '#333',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
        onClick={(): void => {handleDataRetrieve(category, baselineValue, metric, comparisonValue)
          .then(() => {
            // Handle success if needed
            console.log("Success");
          })
          .catch((error) => {
            console.error('Error retrieving data:', error);
          })}}
      >
        Retrieve Data
      </button>
      {showGraphs &&<Graphs graphs={graphs}
       baselineData={baselineValue}
       comparisonData={comparisonValue} />}
    </div>
  );
};

export default GraphParent;
