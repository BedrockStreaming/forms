export const Checkbox = ({
  onChange,
  value,
  label,
  shouldDisplayRequiredHint,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
  label: string;
  shouldDisplayRequiredHint?: boolean;
}) => {
  if (shouldDisplayRequiredHint) {
    label += ' *';
  }

  return (
    <div>
      <label>{label}</label>
      <input type="checkbox" checked={value} onChange={onChange} />
    </div>
  );
};
