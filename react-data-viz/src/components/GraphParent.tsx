import React, { useState, useEffect } from 'react';
import Metrics from './Metrics';
import Graphs from './Graphs';
import { graphs, DataResponse } from '../utils/types';
import axios from 'axios';

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
    const fetchData = async () => {
      try {
        const response = await axios.get<DataResponse>('http://localhost:4000/api/data');
        const { categories, metrics } = response.data;
        setCategories(categories);
        setMetrics(metrics);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    void fetchData();
  }, []);

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
  


  const handleDataRetrieve = () => {
    // Call your backend API to retrieve data based on baseline and comparison inputs
    // Pass the retrieved data to the respective graph components
    // Update the 'graphs' state with the graph data

    // Example of retrieving data for a single graph
   /* try {
      const response = await axios.get<TableResponse>('/api/getGraphData');
      console.log('Data response:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }*/

    setShowGraphs(true);
  };

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
        onClick={handleDataRetrieve}
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
