import React from "react";
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import FacilityApproval from "../components/AdminDashboard/FacilityApproval";
import SystemOverview from "../components/AdminDashboard/SystemOverview";
import UserManagement from "../components/AdminDashboard/UserManagement";

function AdminDashboard() {
  return (
    <Box p={8}>
      <Heading
        as="h1"
        size="xl"
        mb={6}
      >
        Admin Dashboard
      </Heading>
      <Tabs>
        <TabList>
          <Tab>System Overview</Tab>
          <Tab>Facility Approval</Tab>
          <Tab>User Management</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SystemOverview />
          </TabPanel>
          <TabPanel>
            <FacilityApproval />
          </TabPanel>
          <TabPanel>
            <UserManagement />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default AdminDashboard;
