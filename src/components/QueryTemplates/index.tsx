import {
  Box,
  VStack,
  Text,
  Button,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tooltip,
  useClipboard,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useQueryStore } from '../../store/queryStore';

const templates = {
  'Products': [
    {
      name: 'All Products',
      sql: 'SELECT * FROM products;',
      description: 'List all products in the catalog'
    },
    {
      name: 'Products by Category',
      sql: 'SELECT p.ProductName, c.CategoryName\nFROM products p\nJOIN categories c ON p.CategoryID = c.CategoryID;',
      description: 'Show products with their categories'
    },
    {
      name: 'Most Expensive Products',
      sql: 'SELECT ProductName, UnitPrice\nFROM products\nORDER BY UnitPrice DESC\nLIMIT 10;',
      description: 'Top 10 most expensive products'
    }
  ],
  'Customers': [
    {
      name: 'All Customers',
      sql: 'SELECT * FROM customers;',
      description: 'List all customers'
    },
    {
      name: 'Customers by Country',
      sql: 'SELECT Country, COUNT(*) as CustomerCount\nFROM customers\nGROUP BY Country\nORDER BY CustomerCount DESC;',
      description: 'Count of customers by country'
    },
    {
      name: 'Top Customers by Sales',
      sql: `
SELECT 
  c.CustomerID, 
  c.CompanyName, 
  SUM(od.Quantity * od.UnitPrice) as TotalPurchases
FROM customers c
JOIN orders o ON c.CustomerID = o.CustomerID
JOIN order_details od ON o.OrderID = od.OrderID
GROUP BY c.CustomerID
ORDER BY TotalPurchases DESC
LIMIT 10;`,
      description: 'Top 10 customers by total purchase amount'
    }
  ],
  'Orders': [
    {
      name: 'All Orders',
      sql: 'SELECT * FROM orders;',
      description: 'List all orders'
    },
    {
      name: 'Orders by Employee',
      sql: `
SELECT 
  e.FirstName, 
  e.LastName, 
  COUNT(o.OrderID) as OrderCount
FROM employees e
JOIN orders o ON e.EmployeeID = o.EmployeeID
GROUP BY e.EmployeeID
ORDER BY OrderCount DESC;`,
      description: 'Number of orders handled by each employee'
    },
    {
      name: 'Recent Orders',
      sql: 'SELECT * FROM orders\nORDER BY OrderDate DESC\nLIMIT 20;',
      description: 'Most recent 20 orders'
    }
  ],
  'Employees': [
    {
      name: 'All Employees',
      sql: 'SELECT * FROM employees;',
      description: 'List all employees'
    },
    {
      name: 'Employees by Region',
      sql: `
SELECT 
  e.FirstName, 
  e.LastName, 
  t.TerritoryDescription
FROM employees e
JOIN employee_territories et ON e.EmployeeID = et.EmployeeID
JOIN territories t ON et.TerritoryID = t.TerritoryID;`,
      description: 'Employees and their territories'
    }
  ]
};

interface QueryTemplatesProps {
  onClose?: () => void;
}

export function QueryTemplates({ onClose }: QueryTemplatesProps) {
  const { setSql } = useQueryStore();
  const hoverBg = useColorModeValue('brand.50', 'brand.900');
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleTemplateClick = (sql: string) => {
    setSql(sql);
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <Box
      h="full"
      overflowY="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'var(--chakra-colors-brand-200)',
          borderRadius: '4px',
        },
      }}
    >
      <Text
        fontSize="md"
        fontWeight="semibold"
        mb={4}
        color="brand.600"
        display="flex"
        alignItems="center"
        gap={2}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
        </svg>
        Query Templates
      </Text>
      <Accordion
        allowMultiple
        reduceMotion
        variant="clean"
      >
        {Object.entries(templates).map(([category, queries]) => (
          <AccordionItem
            key={category}
            border="none"
            mb={2}
          >
            <AccordionButton
              py={2}
              px={0}
              _hover={{ bg: 'transparent' }}
              _expanded={{ color: 'brand.500' }}
            >
              <Box flex="1" textAlign="left">
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color="brand.600"
                >
                  {category}
                </Text>
              </Box>
              <AccordionIcon color="brand.500" />
            </AccordionButton>
            <AccordionPanel pb={4} px={0}>
              <VStack spacing={2} align="stretch">
                {queries.map((query, index) => {
                  const { hasCopied, onCopy } = useClipboard(query.sql);

                  return (
                    <Tooltip
                      key={index}
                      label={query.description}
                      placement="right"
                      hasArrow
                    >
                      <HStack
                        spacing={2}
                        w="full"
                        bg={hoverBg}
                        borderRadius="md"
                        p={1}
                        transition="all 0.2s"
                        _hover={{
                          bg: useColorModeValue('brand.100', 'brand.800'),
                          transform: 'translateX(5px)'
                        }}
                        onClick={() => handleTemplateClick(query.sql)}
                      >
                        <Button
                          size="sm"
                          variant="ghost"
                          justifyContent="flex-start"
                          flex={1}
                          leftIcon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                              style={{ color: '#009688' }}
                            >
                              <path d="M20 8h-8V4h-2v4H2v2h8v4h2v-4h8z" />
                            </svg>
                          }
                          color="brand.700"
                          _hover={{
                            color: 'brand.500'
                          }}
                        >
                          {query.name}
                        </Button>
                        <Tooltip
                          label={hasCopied ? 'Copied!' : 'Copy SQL'}
                          placement="top"
                        >
                          <Button
                            size="xs"
                            variant="ghost"
                            colorScheme="brand"
                            onClick={onCopy}
                            px={2}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              style={{ color: '#009688' }}
                            >
                              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 14H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2z" />
                            </svg>
                          </Button>
                        </Tooltip>
                      </HStack>
                    </Tooltip>
                  );
                })}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}