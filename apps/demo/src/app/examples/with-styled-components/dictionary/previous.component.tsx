export const Previous = ({ label, ...props }: { label: string }) => {
  return (
    <button type="button" {...props}>
      {label || 'Previous'}
    </button>
  );
};
