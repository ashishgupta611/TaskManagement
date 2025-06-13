// components/TaskItems.tsx
import React from 'react';
import { TaskItem } from '../interfaces';

type TaskItemsProps = {
  data: TaskItem[];
  keyExtractor?: (item: TaskItem) => string | number;
  renderItem: ({ item, index }: { item: TaskItem; index: number }) => React.ReactNode;
  numColumns?: number;
  ListEmptyComponent?: React.ReactNode;
  ListHeaderComponent?: React.ReactNode;
  ListFooterComponent?: React.ReactNode;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  className?: string;
  containerHeight?: string; // e.g., "h-96" or "h-[500px]"
  horizontal?: boolean;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
};

const ListItems: React.FC<TaskItemsProps> = ({
  data,
  keyExtractor = (item) => item.id,
  renderItem,
  numColumns = 1,
  ListEmptyComponent = (
    <div className="flex items-center justify-center h-full">
      <p className="text-white text-text text-2xl font-semibold">No items to display</p>
    </div>
  ),
  ListHeaderComponent = null,
  ListFooterComponent = null,
  onEndReached,
  onEndReachedThreshold = 0.5,
  className = '',
  containerHeight = 'h-96',
  horizontal = false,
  showsVerticalScrollIndicator = true,
  showsHorizontalScrollIndicator = true,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!onEndReached || !containerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const scrollPosition = scrollTop + clientHeight;
    const threshold = scrollHeight * onEndReachedThreshold;
    
    if (scrollPosition >= scrollHeight - threshold) {
      onEndReached();
    }
  };

  // Scrollbar visibility classes
  const scrollbarClasses = [
    showsVerticalScrollIndicator ? '' : 'scrollbar-hide',
    showsHorizontalScrollIndicator ? '' : 'scrollbar-hide-horizontal',
  ].join(' ');

  return (
    <div className={`${className} ${containerHeight}`}>
      {ListHeaderComponent}
      
      {data.length === 0 ? (
        ListEmptyComponent
      ) : (
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className={`w-full h-full overflow-auto ${scrollbarClasses} ${
            horizontal ? 'flex flex-row' : ''
          }`}
        >
          {!horizontal ? (
            <div className={`grid ${getGridColumnsClass(numColumns)} gap-4 p-2`}>
              {data.map((item, index) => (
                <div key={keyExtractor(item)}>
                  {renderItem({ item, index })}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-row space-x-4 p-2">
              {data.map((item, index) => (
                <div key={keyExtractor(item)} className="flex-none">
                  {renderItem({ item, index })}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {ListFooterComponent}
    </div>
  );
};

// Helper function to generate Tailwind grid classes
const getGridColumnsClass = (columns: number): string => {
  switch (columns) {
    case 1: return 'grid-cols-1';
    case 2: return 'grid-cols-1 sm:grid-cols-2';
    case 3: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
    case 4: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    default: return 'grid-cols-1';
  }
};

export default ListItems;