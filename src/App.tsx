import { lazy, Suspense, useState } from 'react';
import {
  Box,
  ChakraProvider,
  Container,
  Grid,
  GridItem,
  IconButton,
  Tooltip,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel
} from '@chakra-ui/react';
import { theme } from './theme';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { QueryTemplates } from './components/QueryTemplates';
import { ShortcutsModal } from './components/ShortcutsModal';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';

const QueryEditor = lazy(() => import(/* webpackChunkName: "QueryEditor" */ './components/QueryEditor'));
const ResultsTable = lazy(() =>
  import(/* webpackChunkName: "ResultsTable", webpackPrefetch: true */ './components/ResultsTable')
);

function App() {
  useKeyboardShortcuts();
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);

  const openShortcutsModal = () => setIsShortcutsModalOpen(true);
  const closeShortcutsModal = () => setIsShortcutsModalOpen(false);

  return (
    <Suspense fallback={<Loader />}>
      <ChakraProvider theme={theme}>
        <Box
          minH="100vh"
          w="100vw"
          bg="background.50"
          display="flex"
          flexDirection="column"
          overflow="hidden"
          position="relative"
        >
          <Navbar />
          <ShortcutsModal
            isOpen={isShortcutsModalOpen}
            onClose={closeShortcutsModal}
          />

          <Box
            position="fixed"
            top="4"
            right="4"
            zIndex="1000"
            visibility={{
              base: 'hidden',
              sm: 'hidden',
              md: 'hidden',
              lg: 'visible'
            }}
          >
            <Tooltip label="Keyboard Shortcuts">
              <IconButton
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="25" height="25">
                    <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                  </svg>
                }
                onClick={openShortcutsModal}
                variant="ghost"
                aria-label="Open Shortcuts"
                color="white"
                _hover={{
                  bg: 'whiteAlpha.200'
                }}
              />
            </Tooltip>
          </Box>

          <Container
            maxW="container.xl"
            py={4}
            flex="1"
            display="flex"
            flexDirection="column"
            position="relative"
          >
            <Grid
              flex="1"
              h="full"
              templateColumns={{ base: "1fr", md: "280px 1fr" }}
              templateRows={{ base: "auto auto 1fr", md: "1fr" }}
              gap={4}
              overflow="hidden"
            >
              <GridItem
                display={{ base: "none", md: "block" }}
                overflowY="auto"
                pr={2}
              >
                <QueryTemplates />
              </GridItem>

              <Box display={{ base: 'block', md: 'none' }} mb={4}>
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton bg="gray.100">
                      <Box flex="1" textAlign="left">
                        Query Templates
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <QueryTemplates />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>

              <GridItem
                display="flex"
                flexDirection="column"
                gap={4}
                overflow="hidden"
              >
                <Box
                  flex="0 0 auto"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="md"
                >
                  <QueryEditor />
                </Box>

                <Box
                  flex="1"
                  borderRadius="lg"
                  boxShadow="md"
                  overflow="hidden"
                >
                  <ResultsTable />
                </Box>
              </GridItem>
            </Grid>
          </Container>
          <Footer />
        </Box>
      </ChakraProvider>
    </Suspense>
  );
}

export default App;