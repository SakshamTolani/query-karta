import { useEffect, useState } from 'react';
import { useQueryStore } from '../store/queryStore';

interface DatabaseData {
  products: any[];
  customers: any[];
  orders: any[];
  employees: any[];
}

export const executeQuery = async (
  sql: string,
  databaseData: DatabaseData,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  setResults: (results: any[]) => void
) => {
  setLoading(true);
  setError(null);

  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    const tableName = sql.toLowerCase().match(/from\s+(\w+)/)?.[1];
    if (!tableName) {
      throw new Error('No table specified in query');
    }

    let queryResults;
    switch (tableName) {
      case 'products':
        queryResults = databaseData.products;
        break;
      case 'customers':
        queryResults = databaseData.customers;
        break;
      case 'orders':
        queryResults = databaseData.orders;
        break;
      case 'employees':
        queryResults = databaseData.employees;
        break;
      default:
        throw new Error(`Table '${tableName}' not found`);
    }

    if (sql.toLowerCase().includes('limit')) {
      const limit = sql.toLowerCase().match(/limit\s+(\d+)/)?.[1];
      if (limit) {
        queryResults = queryResults.slice(0, parseInt(limit));
      }
    }

    setResults(queryResults);
    return queryResults;
  } catch (error: any) {
    setError(error.message);
    throw error;
  } finally {
    setLoading(false);
  }
};

export const useQueryExecution = () => {
  const { sql, setLoading, setResults, setError } = useQueryStore();
  const [databaseData, setDatabaseData] = useState<DatabaseData>({
    products: [],
    customers: [],
    orders: [],
    employees: []
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [products, customers, orders, employees] = await Promise.all([
          fetch('../../data/products.json').then(res => res.json()),
          fetch('../../data/customers.json').then(res => res.json()),
          fetch('../../data/orders.json').then(res => res.json()),
          fetch('../../data/employees.json').then(res => res.json())
        ]);

        setDatabaseData({
          products,
          customers,
          orders,
          employees
        });
      } catch (error) {
        console.error('Error loading JSON data:', error);
      }
    };

    loadData();
  }, []);

  const handleQueryExecution = async (query?: string) => {
    const queryToExecute = query || sql;

    try {
      const results = await executeQuery(
        queryToExecute,
        databaseData,
        setLoading,
        setError,
        setResults
      );
      console.log("Query Results:", results);
      return true;
    } catch {
      return false;
    }
  };

  return { handleQueryExecution, databaseData };
};