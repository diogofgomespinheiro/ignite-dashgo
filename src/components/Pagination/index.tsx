import { Box, Stack, Text } from '@chakra-ui/react';

import { PaginationItem } from './PaginationItem';

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const SIBLINGS_COUNT = 1;

function generatePagesArray(from: number, to: number) {
  const size = to - from;

  return [...new Array(size)]
    .map((_, index) => index + from + 1)
    .filter(page => page > 0);
}

function getSiblingsPaginationItems(
  pages: number[],
  onPageChange: (page: number) => void
) {
  return (
    pages.length > 0 &&
    pages.map(page => (
      <PaginationItem key={page} number={page} onPageChange={onPageChange} />
    ))
  );
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - SIBLINGS_COUNT, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + SIBLINGS_COUNT, lastPage)
        )
      : [];

  const isFirstPageWithinSiblings = currentPage <= 1 + SIBLINGS_COUNT;
  const isFirstPageNextToSiblings = currentPage <= 2 + SIBLINGS_COUNT;
  const isLastPageWithinSiblings = currentPage + SIBLINGS_COUNT >= lastPage;
  const isLastPageNextToSiblings = currentPage + 1 + SIBLINGS_COUNT >= lastPage;

  return (
    <Stack
      direction={['column', 'row']}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> of <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {!isFirstPageWithinSiblings && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />
            {!isFirstPageNextToSiblings && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {getSiblingsPaginationItems(previousPages, onPageChange)}

        <PaginationItem
          number={currentPage}
          isCurrent
          onPageChange={onPageChange}
        />

        {getSiblingsPaginationItems(nextPages, onPageChange)}

        {!isLastPageWithinSiblings && (
          <>
            {!isLastPageNextToSiblings && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem number={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
