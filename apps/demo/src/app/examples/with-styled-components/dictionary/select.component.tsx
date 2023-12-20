export const Select = ({
  onChange,
  value,
  label,
  choices,
  multiple,
  shouldDisplayRequiredHint,
}: {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | number;
  label: string;
  choices: string[] | number[];
  multiple?: boolean;
  shouldDisplayRequiredHint?: boolean;
}) => {
  if (shouldDisplayRequiredHint) {
    label += ' *';
  }

  return (
    <div style={{ margin: '24px' }}>
      <label>
        {label}
        <select multiple={multiple} value={value} onChange={onChange}>
          {choices.map((choice) => (
            <option key={choice} value={choice}>
              {choice}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
