import React, { useState, useEffect } from "react";
import Toggle from "../common/Toggle";
import Status from "../common/Status";
import Icon from "../common/icons/Icon";

type BlockType = "button" | "toggle" | "detail";

interface BlockProps {
  type: BlockType;
  title: string;
  subtitle?: string;
  info?: string;
  action?: React.ReactNode;
  statusType?: "approved" | "rejected" | "pending";
  isActive?: boolean;
  onNext?: () => void;
  onToggleChange?: (isOn: boolean) => void;
}

const Block: React.FC<BlockProps> = ({
  type,
  title,
  subtitle,
  info,
  action,
  statusType,
  isActive = false,
  onNext,
  onToggleChange,
}) => {
  const [isToggleon, setIsToggleOn] = useState(isActive);

  useEffect(() => {
    console.log("Block isActive changed:", { title, isActive });
    setIsToggleOn(isActive);
  }, [isActive, title]);

  const handleToggleChange = (state: boolean) => {
    console.log("Toggle state changed:", { title, state });
    setIsToggleOn(state);
    onToggleChange?.(state);
  };

  const handleDetailClick = () => {
    if (type === "detail" && onNext) {
      onNext();
    }
  };

  return (
    <div
      className="flex w-full justify-between items-center bg-white shadow-custom-basic rounded-2xl px-7 py-6"
      onClick={handleDetailClick}
      style={type === "detail" ? { cursor: "pointer" } : {}}>
      <div>
        <div className="font-bold text-lg text-black">{title}</div>
        {subtitle && <div className="text-sm text-black mt-3 mb-1.5">{subtitle}</div>}
        {info && <div className="text-sm text-black ">{info}</div>}
      </div>

      <div>
        {type === "button" ? (
          action
        ) : type === "toggle" ? (
          <div className="flex flex-col items-center justify-center">
            <div className="mb-6">
              <Status
                statusType={isToggleon ? "active" : "paused"}
                color={isToggleon ? "blue" : "gray"}
              />
            </div>
            <Toggle
              isOn={isToggleon}
              onToggle={handleToggleChange}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ) : type === "detail" ? (
          <div className="flex items-center">
            <Status
              statusType={statusType || "pending"}
              color={
                statusType === "approved" ? "blue" : statusType === "rejected" ? "red" : "gray"
              }
            />
            <div className="flex items-center justify-center rounded-full">
              <Icon name="arrowicon_line_right" size={12} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Block;
