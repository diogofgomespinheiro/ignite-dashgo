import Link from 'next/link';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import { RiAddLine } from 'react-icons/ri';

import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Pagination } from '@/components/Pagination';

function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    large: true,
  });

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal ">
              Users
            </Heading>
            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Create User
              </Button>
            </Link>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={['4', '4', '6']} color="gray.300" width="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>User</Th>
                {isWideVersion && <Th>Register Date</Th>}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={['4', '4', '6']}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Diogo Pinheiro</Text>
                    <Text fontSize="small" color="gray.300">
                      diogo.fgomes.pinheiro@gmail.com
                    </Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>04 April 2021</Td>}
              </Tr>
              <Tr>
                <Td px={['4', '4', '6']}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Diogo Pinheiro</Text>
                    <Text fontSize="small" color="gray.300">
                      diogo.fgomes.pinheiro@gmail.com
                    </Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>04 April 2021</Td>}
              </Tr>
              <Tr>
                <Td px="6">
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Diogo Pinheiro</Text>
                    <Text fontSize="small" color="gray.300">
                      diogo.fgomes.pinheiro@gmail.com
                    </Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>04 April 2021</Td>}
              </Tr>
            </Tbody>
          </Table>
          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}

export default UserList;
