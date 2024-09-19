import  { useEffect,useCallback, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce";

const ProductMultiSelect = ({ value, onChange}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  
  const debouncedInputValue = useDebounce(inputValue, 500); // Debounce with a 500ms delay

  // Function to fetch products based on the search query
  const fetchProducts = useCallback(async (searchTerm) => {
    if (searchTerm) {
      try {
        const response = await axios.get(`/api/search-product?query=${searchTerm}`);
        const products = response.data.products.map((product) => ({
          value: product.id,
          label: product.name,
        }));
        setOptions(products);
        return products;
      } catch (error) {
        console.error("Error fetching products:", error);
        return [];
      }
    }
    return [];
  }, []);

  // Fetch products whenever the debounced input changes
  useEffect(() => {
    if (debouncedInputValue) {
      fetchProducts(debouncedInputValue);
    }
  }, [debouncedInputValue, fetchProducts]);

  // Handling selection changes
  const handleChange = (selectedOptions) => {
    onChange(selectedOptions ? selectedOptions.map((opt) => opt.value) : []);
  };

  // Handling input change in Select component
  const handleInputChange = (inputVal) => {
    setInputValue(inputVal);
  };

  return (
    <Select
      isMulti
      value={options.filter((opt) => value.includes(opt.value))}
      options={options}
      onInputChange={handleInputChange} // Set input change handler
      onChange={handleChange}
      placeholder="Search and select products"
      classNamePrefix="react-select"
      isClearable
    />
  );
};

export default ProductMultiSelect;
