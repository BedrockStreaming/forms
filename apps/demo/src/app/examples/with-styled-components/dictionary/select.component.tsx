export const Select = ({
  onChange,
  value,
  label,
  choices,
  multiple
}: {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | number;
  label: string;
  choices: string[] | number[];
  multiple?: boolean;
}) => {
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
