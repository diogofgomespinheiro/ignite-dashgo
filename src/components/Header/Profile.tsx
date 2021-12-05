import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Diogo Pinheiro</Text>
        <Text color="gray.300" fontSize="small">
          diogo.fgomes.pinheiro@gmail.com
        </Text>
      </Box>
      <Avatar size="md" name="Diogo Pinheiro" />
    </Flex>
  );
}
