import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import StatCardGrid from '@/components/Dashboard/StatCardGrid';
import LineChartCard from '@/components/Dashboard/LineChartCard';
import InfoStatsRow from '@/components/Dashboard/InfoStatsRow';

/**
 * @page LeadsOverviewPage
 * @description This page displays the main CRM dashboard focused on leads overview.
 * It utilizes the DashboardLayout (implemented as MainAppLayout) to structure the
 * sidebar, header, and main content area. The main content area includes:
 * - StatCardGrid: Displays funnel statistics and lead sources via PieChart.
 * - LineChartCard: Shows leads tracking over time.
 * - InfoStatsRow: Summarizes reasons for lost leads and other key metrics.
 * 
 * The page title passed to the layout is "Dashboard", and the "Leads" tab in the
 * header is expected to be active by default as per TopHeader/Header component logic
 * when on a leads-related view.
 */
const IndexPage: React.FC = () => {
  return (
    <MainAppLayout pageTitle="Dashboard">
      {/* 
        The MainAppLayout's children are rendered within a container 
        that uses `flex flex-col gap-6`. This will stack the components vertically
        with spacing.
      */}
      <StatCardGrid />
      <LineChartCard />
      <InfoStatsRow />
    </MainAppLayout>
  );
};

export default IndexPage;
