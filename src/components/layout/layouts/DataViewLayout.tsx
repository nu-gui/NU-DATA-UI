import React, { ReactNode, useState } from 'react';
import PageContainer from '../PageContainer';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { breakpoints } from '../../../hooks/useMediaQuery';
import { MicroInteraction } from '../../animations/MicroInteraction';

interface DataViewLayoutProps {
  children: ReactNode;
  title: string;
  filterPanel: ReactNode;
  fullWidth?: boolean;
}

const DataViewLayout: React.FC<DataViewLayoutProps> = ({ 
  children, 
  title,
  filterPanel,
  fullWidth = false 
}) => {
  const isLargeScreen = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);
  const [filtersVisible, setFiltersVisible] = useState(isLargeScreen);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  return (
    <PageContainer 
      title={title} 
      fullWidth={fullWidth}
      animationType="fade"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Filter sidebar - hidden on mobile unless toggled */}
        <div className={`lg:w-1/4 transition-all ${
          filtersVisible ? 'block' : 'hidden lg:block'
        }`}>
          {filterPanel}
        </div>

        {/* Main content area */}
        <div className="flex-1">
          {/* Filter toggle button (visible on mobile only) */}
          <div className="lg:hidden mb-4">
            <MicroInteraction type="hover">
              <button
                onClick={toggleFilters}
                className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-md w-full"
              >
                {filtersVisible ? 'Hide Filters' : 'Show Filters'}
              </button>
            </MicroInteraction>
          </div>

          {/* Data content */}
          {children}
        </div>
      </div>
    </PageContainer>
  );
};

export default DataViewLayout;
