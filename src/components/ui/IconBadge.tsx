import { ICON_MAP } from "@/lib/icons/icon-map";

interface IconBadgeProps {
  iconKey: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function IconBadge({ iconKey, size = 20, strokeWidth = 2, className }: IconBadgeProps) {
  const Icon = ICON_MAP[iconKey];
  if (!Icon) return null;
  return <Icon size={size} strokeWidth={strokeWidth} className={className} />;
}
