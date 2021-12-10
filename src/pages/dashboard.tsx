import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  tooltip: {
    enabled: false,
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-03-18',
      '2021-03-19',
      '2021-03-20',
      '2021-03-21',
      '2021-03-22',
      '2021-03-23',
      '2021-03-24',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [
  {
    name: 'series1',
    data: [30, 80, 45, 50, 49, 60, 70],
  },
];

function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
            <Text>Weekly Subscribers</Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
          <Box p={['6', '8']} bg="gray.800" borderRadius={8}>
            <Text>Open Rate</Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export default Dashboard;
