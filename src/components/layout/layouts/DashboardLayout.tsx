import React, { ReactNode } from 'react';
import PageContainer from '../PageContainer';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { breakpoints } from '../../../hooks/useMediaQuery';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  fullWidth?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title,
  fullWidth = false 
}) => {
  const isLargeScreen = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);
  const isMediumScreen = useMediaQuery(`(min-width: ${breakpoints.md}px)`);

  return (
    <PageContainer 
      title={title} 
      fullWidth={fullWidth}
      animationType="fade"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {children}
      </div>
    </PageContainer>
  );
};

export default DashboardLayout;
