import { FC } from 'react';
import { Box, Link, Text } from '@chakra-ui/react';

export const Footer: FC = () => {
  return (
    <Box
      as="footer"
      bg="background.900"
      borderTop="1px"
      borderColor="brand.500"
      py={4}
      mt="auto"
    >
      <Box
        maxW="container.xl"
        mx="auto"
        px={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          color="white"
          fontSize="sm"
          display="flex"
          alignItems="center"
          gap={1}
        >
          Made with
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            style={{ color: 'red' }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          by
          <Link
            href="https://linkedin.com/in/saksham-tolani"
            isExternal
            color="accent.400"
            fontWeight="medium"
            display="inline-flex"
            alignItems="center"
            gap={1}
            _hover={{
              color: 'accent.300',
              textDecoration: 'none',
            }}
          >
            Saksham
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              style={{ color: 'blue' }}
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.5c0-1.378-.028-3.152-1.92-3.152-1.92 0-2.215 1.5-2.215 3.048v5.604h-3v-10h2.881v1.367h.041c.401-.759 1.379-1.559 2.841-1.559 3.037 0 3.6 2 3.6 4.604v5.588z" />
            </svg>
          </Link>
        </Text>
      </Box>
    </Box>
  );
};