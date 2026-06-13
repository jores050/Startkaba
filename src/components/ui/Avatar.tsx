/* eslint-disable @next/next/no-img-element */

interface AvatarProps {
  fullName: string;
  avatarUrl?: string | null;
  size?: "sm" | "md" | "lg";
}

function initials(fullName: string): string {
  return fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export function Avatar({ fullName, avatarUrl, size = "md" }: AvatarProps) {
  const sizeClass =
    size === "lg" ? "w-24 h-24 text-3xl" :
    size === "sm" ? "w-8 h-8 text-xs" :
    "w-12 h-12 text-lg";

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={`Avatar de ${fullName}`}
        className={`${sizeClass} rounded-full object-cover border-2 border-primary`}
      />
    );
  }

  return (
    <div
      aria-label={`Avatar de ${fullName}`}
      className={`${sizeClass} rounded-full bg-primary text-white font-bold flex items-center justify-center`}
    >
      {initials(fullName) || "?"}
    </div>
  );
}
