import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';

export function Navbar() {
  return (
    <Box
      as="nav"
      bg="background.900"
      position="sticky"
      top={0}
      zIndex={1000}
      borderBottom="1px"
      borderColor="brand.500"
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        h="16"
        px={{ base: 16, md: 4 }}
        align="center"
        justify="space-between"
      >
        <Heading
          size="md"
          bgGradient="linear(to-r, brand.400, accent.400)"
          bgClip="text"
          fontWeight="bold"
          letterSpacing="tight"
          ml={{ base: 4, md: 0 }}
        >
          SQL Code Editor
        </Heading>

        <Link
          href="https://github.com/SakshamTolani/query-karta"
          isExternal
        >
          <Button
            leftIcon={<svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="20"
              height="20"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.17c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.305 3.492.997.11-.774.42-1.305.763-1.605-2.665-.3-5.467-1.333-5.467-5.93 0-1.31.467-2.382 1.236-3.222-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.48 11.48 0 013.003-.404c1.02.005 2.045.137 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.242 2.873.12 3.176.77.84 1.235 1.912 1.235 3.222 0 4.61-2.807 5.625-5.48 5.92.43.37.815 1.1.815 2.22v3.293c0 .32.19.694.8.577C20.565 21.796 24 17.296 24 12c0-6.63-5.37-12-12-12z" />
            </svg>}
            bg="brand.500"
            color="white"
            size="sm"
            px={3}
            _hover={{
              bg: 'brand.400',
              transform: 'translateY(-2px)',
              shadow: 'lg'
            }}
            transition="all 0.2s"
          >
            GitHub
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}