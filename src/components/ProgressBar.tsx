import React from "react";

interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  height?: number;
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = "bg-blue-500",
  height = 4,
  showPercentage = false,
}) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full">
      <div
        className={`w-full bg-gray-200 rounded-full overflow-hidden`}
        style={{ height: `${height}px` }}
      >
        <div
          className={`${color} transition-all duration-300 ease-out`}
          style={{ width: `${clampedProgress}%` }}
        ></div>
      </div>
      {showPercentage && (
        <div className="text-right text-xs text-gray-500 mt-1">
          {Math.round(clampedProgress)}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
