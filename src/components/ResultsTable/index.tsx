import { useState, useMemo, memo } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Text,
  Flex,
  Input,
  IconButton,
  Tooltip
} from '@chakra-ui/react';
import { useQueryStore } from '../../store/queryStore';
import { Loader } from '../Loader';

const CSVIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 4.5V14C14 14.5523 13.5523 15 13 15H3C2.44772 15 2 14.5523 2 14V2C2 1.44772 2.44772 1 3 1H10.5L14 4.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M5 7.5H11M5 10H11M5 12.5H11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ResultsTable = memo(function ResultsTable() {
  const { results, isLoading, error } = useQueryStore();
  const [searchTerm, setSearchTerm] = useState('');
  const CONTAINER_HEIGHT = 500;
  const SEARCH_INPUT_HEIGHT = 50;
  const headers = useMemo(() => {
    if (!results || results.length === 0) return [];
    return Object.keys(results[0]);
  }, [results]);

  const filteredResults = useMemo(() => {
    if (!searchTerm) return results;
    return results?.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    ) || [];
  }, [results, searchTerm]);

  const handleExportCSV = () => {
    if (!results || results.length === 0) return;

    try {
      const bom = '\uFEFF';
      const rows = [headers];

      const chunkSize = 1000;
      if (!filteredResults) return;
      for (let i = 0; i < filteredResults.length; i += chunkSize) {
        const chunk = filteredResults.slice(i, i + chunkSize);
        chunk.forEach(row => {
          rows.push(
            headers.map(header => {
              const value = row[header];
              return value === null ? '' :
                typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
            })
          );
        });
      }

      const csvContent = bom + rows.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `query_results_${new Date().toISOString().slice(0, 19).replace(/[:]/g, '-')}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  return (
    <VStack
      spacing={4}
      w="full"
      h="full"
      p={4}
      bg="background.50"
      position="relative"
    >
      <Box
        h={`${SEARCH_INPUT_HEIGHT}px`}
        w="full"
        visibility={results && results.length > 0 ? 'visible' : 'hidden'}
      >
        {results && results.length > 0 && (
          <Flex w="full" justifyContent="flex-end" gap={2}>
            <Input
              placeholder="Search results..."
              w="300px"
              value={searchTerm}
              _placeholder={{ color: 'brand.400' }}
              borderColor={'brand.200'}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Tooltip label="Export to CSV">
              <IconButton
                icon={<CSVIcon />}
                aria-label="Export to CSV"
                onClick={handleExportCSV}
                colorScheme="brand"
                size="md"
              />
            </Tooltip>
          </Flex>
        )}
      </Box>

      {isLoading && (
        <Box
          p={8}
          w="full"
          h={`${CONTAINER_HEIGHT}px`}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Loader />
        </Box>
      )}

      {error && (
        <Box
          h={`${CONTAINER_HEIGHT}px`}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="red.500" fontSize="md">
            {error}
          </Text>
        </Box>
      )}

      {!isLoading && !error && results?.length === 0 && (
        <Box
          h={`${CONTAINER_HEIGHT}px`}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="brand.600" fontSize="md">
            No results found. Please execute a query.
          </Text>
        </Box>
      )}

      {results && results.length > 0 && (
        <Box
          w="full"
          h={`${CONTAINER_HEIGHT}px`} overflowY="auto"
          border="1px solid"
          borderColor="brand.100"
          borderRadius="md"
          boxShadow="sm"
        >
          <Table variant="simple" size="sm" w="full">
            <Thead
              position="sticky"
              top={0}
              bg="brand.50"
              zIndex={1}
            >
              <Tr>
                {headers.map(header => (
                  <Th
                    key={header}
                    textTransform="uppercase"
                    color="brand.700"
                    position="sticky"
                    top={0}
                    bg="brand.50"
                    letterSpacing="wider"
                    fontWeight="bold"
                    borderBottomColor="brand.100"
                  >
                    {header.replace(/([A-Z])/g, ' $1').trim()}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {filteredResults?.map((row, index) => (
                <Tr
                  key={index}
                  _hover={{
                    bg: 'brand.50',
                    transition: 'background-color 0.2s'
                  }}
                >
                  {headers.map(header => (
                    <Td
                      key={header}
                      borderBottomColor="brand.100"
                    >
                      {row[header] !== null ? String(row[header]) : 'N/A'}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </VStack>
  );
}
);


export default ResultsTable;