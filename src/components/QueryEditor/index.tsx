import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import { useQueryStore } from '../../store/queryStore';
import { useQueryExecution } from '../../utils/queryExecutor';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

export default function QueryEditor() {
  useKeyboardShortcuts();
  const { sql, setSql } = useQueryStore();
  const toast = useToast();
  const EDITOR_HEIGHT = 250;
  const { handleQueryExecution } = useQueryExecution();

  const handleEditorMount = (editor: any, monaco: any) => {

    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY',
      'HAVING', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN',
      'LIMIT', 'OFFSET', 'INSERT INTO', 'UPDATE', 'DELETE FROM'
    ];

    monaco.languages.registerCompletionItemProvider('sql', {
      provideCompletionItems: (model: any, position: any) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };

        const suggestions = [
          ...keywords.map(keyword => ({
            label: keyword,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: keyword,
            range
          })),
        ];

        return { suggestions };
      }
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, async () => {
      const latestSql = editor.getValue();

      const success = await handleQueryExecution(latestSql);
      toast({
        title: success ? "Query Executed" : "Query Error",
        description: success ? "Data loaded successfully" : "Failed to execute query",
        status: success ? "success" : "error",
        duration: 2000,
        isClosable: true,
      });
    });
  };

  const handleExecuteQuery = async () => {
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
  };

  return (
    <Box
      h={`${EDITOR_HEIGHT}px`}
      display="flex"
      flexDirection="column"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="xl"
      borderWidth="1px"
      borderColor="brand.100"
    >
      <Box
        flex="1"
        borderBottomWidth="1px"
        borderBottomColor="gray.100"
        overflow="hidden"
      >
        <Editor
          theme="light"
          height="100%"
          defaultLanguage="sql"
          value={sql}
          onChange={(value) => setSql(value || '')}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: 'on',
            padding: { top: 16 },
            automaticLayout: true,
          }}
        />
      </Box>
      <Flex
        p={4}
        bg="brand.50"
        justifyContent="flex-end"
        alignItems="center"
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        className="execute-query-container"
      >
        <Button
          colorScheme="brand"
          onClick={handleExecuteQuery}
          size="md"
          px={6}
          variant="solid"
        >
          Execute Query
        </Button>
      </Flex>
    </Box>
  );
}