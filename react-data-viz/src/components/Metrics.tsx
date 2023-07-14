import React, {useState} from 'react';

interface MetricsProps {
  categories: { countries: string[]; continents: string[] };
  metrics: string[];
  onCategoryChange: (category: string, value: string) => void;
  onMetricChange: (value: string) => void;
  onComparisonValueChange: (value: string) => void;
}

const Metrics: React.FC<MetricsProps> = ({ categories, metrics, onCategoryChange, onMetricChange, onComparisonValueChange }) => {

  const [selectedCategory, setSelectedCategory] = useState('');
  const [baselineValue, setBaselineValue] = useState('');
  const [comparisonValue, setComparisonValue] = useState('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setBaselineValue('');
    setComparisonValue('');
    onCategoryChange(category, '');
  };

  const handleBaselineValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setBaselineValue(value);
    onCategoryChange(selectedCategory, value);
  };
  
  const handleComparisonValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setComparisonValue(value);
    onComparisonValueChange(value);
  };

  const renderOptions = (options: string[]) => {
    return options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

  const renderDynamicDropdowns = () => {
    if (selectedCategory === 'countries' || selectedCategory === 'continents') {
      return (
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <div style={{ marginRight: '10px' }}>
            <label htmlFor="baseline-value" style={{ marginRight: '5px', marginBottom: '5px' }}>
              Baseline Value:
            </label>
            <select
              id="baseline-value"
              value={baselineValue}
              onChange={handleBaselineValueChange}
              style={{ padding: '8px', borderRadius: '5px', width: '100%' }}
            >
              <option value="">-- Select Value --</option>
              {renderOptions(categories[selectedCategory])}
            </select>
          </div>
          <div>
            <label htmlFor="comparison-value" style={{ marginRight: '5px', marginBottom: '5px' }}>
              Comparison Value:
            </label>
            <select
              id="comparison-value"
              value={comparisonValue}
              onChange={handleComparisonValueChange}
              style={{ padding: '8px', borderRadius: '5px', width: '100%' }}
            >
              <option value="">-- Select Value --</option>
              {renderOptions(categories[selectedCategory])}
            </select>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="category" style={{ marginRight: '5px' }}>Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange} style={{ padding: '8px', borderRadius: '5px', width: '100%' }}>
            <option value="">-- Select Category --</option>
            <option value="countries">Countries</option>
            <option value="continents">Continents</option>
          </select>
      </div>

      {renderDynamicDropdowns()}

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="metric" style={{ marginRight: '5px' }}>Metric:</label>
        <select 
        id="metric" 
        onChange={(e) => onMetricChange(e.target.value)} 
        style={{ padding: '8px', borderRadius: '5px', width: '100%' }}
        >
          <option value="">-- Select Metric --</option>
          {metrics.map((metric) => (
            <option key={metric} value={metric}>
              {metric}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Metrics;
