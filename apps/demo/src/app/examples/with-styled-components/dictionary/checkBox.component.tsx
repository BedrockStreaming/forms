export const Checkbox = ({
  onChange,
  value,
  label,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
  label: string;
}) => {
  return (
    <div>
      <label>{label}</label>
      <input type="checkbox" checked={value} onChange={onChange} />
    </div>
  );
};
