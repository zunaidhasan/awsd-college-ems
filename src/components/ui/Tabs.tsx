import React from "react";

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children, className = "" }) => {
  return (
    <div className={`w-full ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value, onValueChange } as any);
        }
        return child;
      })}
    </div>
  );
};

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className = "", value, onValueChange }) => {
  return (
    <div className={`flex space-x-1 p-1 bg-gray-100 dark:bg-slate-800 rounded-lg ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            activeValue: value,
            onClick: () => onValueChange && onValueChange(child.props.value),
          } as any);
        }
        return child;
      })}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  activeValue?: string;
  onClick?: () => void;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  activeValue,
  onClick,
  className = "",
}) => {
  const isActive = activeValue === value;
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-3 py-2 text-xs font-semibold rounded-md transition-all outline-none
        ${
          isActive
            ? "bg-white dark:bg-slate-900 text-brand-primary dark:text-white shadow-sm"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
        } ${className}`}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  activeValue?: string;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  activeValue,
  className = "",
}) => {
  if (activeValue !== value) return null;
  return <div className={`mt-4 ${className}`}>{children}</div>;
};
