import { useEffect } from 'react';
import { useQueryStore } from '../store/queryStore';
import { useToast } from '@chakra-ui/react';
import { useQueryExecution } from '../utils/queryExecutor';

export function useKeyboardShortcuts() {
  const { sql, setSql, setLoading, setResults, setError } = useQueryStore();
  const toast = useToast();
  const { handleQueryExecution } = useQueryExecution();

  useEffect(() => {

    const handleKeyDown = async (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        const success = await handleQueryExecution();
        toast({
          title: success ? "Query Executed" : "Query Error",
          description: success
            ? "Data loaded successfully"
            : "Failed to execute query",
          status: success ? "success" : "error",
          duration: success ? 2000 : 3000,
          isClosable: true,
        });
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        toast({
          title: "Query Saved",
          description: "Current query saved",
          status: "info",
          duration: 2000,
          isClosable: true,
        });
      }

      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        const lines = sql.split('\n');
        const commentedLines = lines.map(line =>
          line.trim().startsWith('--')
            ? line.replace(/^--\s*/, '')
            : `-- ${line}`
        );
        setSql(commentedLines.join('\n'));
      }

      if (e.altKey && e.key === 'f') {
        e.preventDefault();
        const formattedSql = sql
          .replace(/\s+/g, ' ')
          .replace(/\s*,\s*/g, ', ')
          .replace(/\s*=\s*/g, ' = ')
          .trim();
        setSql(formattedSql);
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        toast({
          title: "Undo",
          description: "Undo functionality not implemented",
          status: "info",
          duration: 2000,
          isClosable: true,
        });
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        toast({
          title: "Redo",
          description: "Redo functionality not implemented",
          status: "info",
          duration: 2000,
          isClosable: true,
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sql, setSql, setLoading, setResults, setError, toast]);
}