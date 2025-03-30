import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  Flex,
} from '@chakra-ui/react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  { keys: ['Ctrl', 'Enter'], description: 'Execute Query' },
  { keys: ['Ctrl', 'S'], description: 'Save Query' },
  { keys: ['Ctrl', '/'], description: 'Toggle Comment' },
  { keys: ['Ctrl', 'Space'], description: 'Trigger Autocomplete' },
  { keys: ['Ctrl', 'Z'], description: 'Undo' },
  { keys: ['Ctrl', 'Y'], description: 'Redo' },
];

export function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Keyboard Shortcuts</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Shortcut</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              {shortcuts.map((shortcut, index) => (
                <Tr key={index}>
                  <Td>
                    <Flex gap={1}>
                      {shortcut.keys.map((key, keyIndex) => (
                        <Badge
                          key={keyIndex}
                          colorScheme="brand"
                          px={2}
                          py={1}
                          borderRadius="md"
                        >
                          {key}
                        </Badge>
                      ))}
                    </Flex>
                  </Td>
                  <Td>
                    <Text>{shortcut.description}</Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}