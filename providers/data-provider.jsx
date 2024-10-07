"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create context
const DataContext = createContext();

// Create provider component
export const DataProvider = ({ children }) => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [clientele, setClientele] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [brandsRes, categoriesRes, testimonialsRes, clienteleRes] = await Promise.all([
          axios.get("/api/brands"), // Fetch brands from API
          axios.get("/api/categories"), // Fetch categories from API
          axios.get("/api/testimonials"), // Fetch testimonials from API
          axios.get("/api/clientele"), // Fetch testimonials from API
        ]);
        setBrands(brandsRes.data);
        setCategories(categoriesRes.data);
        setTestimonials(testimonialsRes.data);
        setClientele(clienteleRes.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{ brands, categories, testimonials,clientele,  loading, error }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use data context
export const useData = () => {
  return useContext(DataContext);
};
