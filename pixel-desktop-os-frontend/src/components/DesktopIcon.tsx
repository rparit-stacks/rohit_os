interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const DesktopIcon = ({ icon, label, onClick }: DesktopIconProps) => {
  return (
    <div className="desktop-icon" onDoubleClick={onClick} onClick={onClick}>
      <div className="icon-sprite text-3xl leading-none transition-transform duration-100">
        {icon}
      </div>
      <span className="font-pixel text-[8px] text-foreground leading-tight mt-1">
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;
