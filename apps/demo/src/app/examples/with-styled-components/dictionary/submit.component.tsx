export const Submit = ({ label, ...props }: { label: string }) => {
  return (
    <button type="submit" {...props}>
      {label}
    </button>
  );
};
