import Select from "react-select";

const MultiSelect = ({ options, value, onChange, isDisabled }) => {
  const handleChange = (selectedOptions) => {
    onChange(
      selectedOptions.length > 0
        ? selectedOptions.map((option) => option.value)
        : []
    );
  };

  const selectedValues = options.filter((option) =>
    value.includes(option.value)
  );

  return (
    <Select
      isMulti
      options={options}
      value={selectedValues}
      onChange={handleChange}
      isDisabled={isDisabled}
    />
  );
};

export default MultiSelect;
