
import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        {title}
      </h2>
      {subtitle && <p className="text-slate-500">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
