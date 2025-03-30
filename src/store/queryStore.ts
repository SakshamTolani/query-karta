import { create } from 'zustand';

interface QueryState {
    sql: string;
    results: any[] | null;
    isLoading: boolean;
    error: string | null;
    setSql: (sql: string) => void;
    setResults: (results: any[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useQueryStore = create<QueryState>((set) => ({
    sql: '',
    results: null,
    isLoading: false,
    error: null,
    setSql: (sql) => set({ sql }),
    setResults: (results) => set({ results }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));