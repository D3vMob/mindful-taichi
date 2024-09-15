import Icon from "~/components/Icon";
import "./MenuItem.css";
import type dynamicIconImports from "lucide-react/dynamicIconImports";

export const MenuItem = ({
  icon,
  title,
  action,
  isActive = null,
}: {
  icon: string;
  title?: string;
  action?: () => void;
  isActive?: (() => boolean) | null;
}) => {
  return (
    <button
      className={`menu-item${isActive?.() ? "is-active" : ""} w-8`}
      onClick={action}
      title={title}
    >
      <Icon name={icon as keyof typeof dynamicIconImports} />
    </button>
  );
};
