export function Button({ children, icon, className = "", ...props }) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center h-[40px]",
        "bg-[var(--color-button-primary-bg)] hover:bg-[var(--color-button-primary-bg-hover)]",
        "text-[var(--color-button-primary-text)] text-[length:var(--text-button-primary-base)] font-medium",
        "px-[var(--space-button-primary-px)] py-[var(--space-button-primary-py)] gap-[var(--space-button-primary-gap)]",
        "rounded-[var(--radius-button-primary-md)]",
        "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        className,
      ].join(" ").trim()}
      {...props}
    >
      {children}
      {icon && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
