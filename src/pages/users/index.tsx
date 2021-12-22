import * as React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
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
import { getUsers, useUsers } from '@/utils/hooks';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

interface UserListProps {
  totalCount: number;
  users: User[];
}

function UserList(props: UserListProps) {
  const [page, setPage] = React.useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page, {
    initialData: props,
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const loadingSection = isLoading && (
    <Flex justify="center" align="center">
      <Spinner />
    </Flex>
  );

  const errorSection = error && (
    <Flex>
      <Text>Error while obtaining users data.</Text>
    </Flex>
  );

  const usersLists = loadingSection || errorSection || (
    <>
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
          {data.users.map(user => (
            <Tr key={user.id}>
              <Td px={['4', '4', '6']}>
                <Checkbox colorScheme="pink" />
              </Td>
              <Td>
                <Box>
                  <Text fontWeight="bold">{user.name}</Text>
                  <Text fontSize="small" color="gray.300">
                    {user.email}
                  </Text>
                </Box>
              </Td>
              {isWideVersion && <Td>{user.createdAt}</Td>}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalCountOfRegisters={data.totalCount}
      />
    </>
  );

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal ">
              Users
              {isFetching && !isLoading && (
                <Spinner size="sm" color="gray.500" ml={4} />
              )}
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
          {usersLists}
        </Box>
      </Flex>
    </Box>
  );
}

export default UserList;

export const getServerSideProps: GetServerSideProps = async () => {
  const { users, totalCount } = await getUsers(1);

  return {
    props: {
      users,
      totalCount,
    },
  };
};
