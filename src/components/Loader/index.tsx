import { Center, Spinner, Box } from '@chakra-ui/react';

export function Loader() {
    return (
        <Box height="100vh" width="100vw" bg="blackAlpha.900">
            <Center height="100%" width="100%">
                <Spinner
                    color="red.500"
                    size="xl"
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    width="80px"
                    height="80px"
                />
            </Center>
        </Box>
    );
}