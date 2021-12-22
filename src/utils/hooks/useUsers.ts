import { useQuery, UseQueryOptions } from 'react-query';

import { api } from '@/services';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersReponse = {
  totalCount: number;
  users: User[];
};

export async function getUsers(page: number): Promise<GetUsersReponse> {
  const { data = {}, headers } = await api.get('users', {
    params: {
      page,
    },
  });

  const { users = [] } = data;
  const totalCount = Number(headers['x-total-count']);

  const mappedUsers = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.created_at).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return { users: mappedUsers, totalCount };
}

export function useUsers(
  page: number,
  options?: UseQueryOptions<GetUsersReponse>
) {
  return useQuery<GetUsersReponse>(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 min,
    ...options,
  });
}
