import React, {useState}from 'react';
import { GraphProps } from './types';

interface TableDataContextType {
  tableData: GraphProps;
  setTableData: React.Dispatch<React.SetStateAction<GraphProps>>;
}

const TableDataContext = React.createContext<TableDataContextType | undefined>(undefined);

export const useTableData = (): TableDataContextType => {
  const context = React.useContext(TableDataContext);
  if (!context) {
    throw new Error('useTableData must be used within a TableDataProvider');
  }
  return context;
};

export const TableDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }) => {
  const [tableData, setTableData] = useState<GraphProps>([]);

  return (
    <TableDataContext.Provider value={{ tableData, setTableData }}>
      {children}
    </TableDataContext.Provider>
  );
};
