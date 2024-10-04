import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Product } from "@/components/products/ProductCard";

export enum SortOptions {
  TITLE_ASC = "Title ascending",
  TITLE_DESC = "Title descending",
  PRICE_ASC = "Price ascending",
  PRICE_DESC = "Price descending",
}

// Define the shape of the filter context
interface FilterContextType {
  category: string;
  setCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  minPrice?: number;
  setMinPrice: (price: number) => void;
  maxPrice?: number;
  setMaxPrice: (price: number) => void;
  data: { products: Product[]; total: number };
  setData: (data: { products: Product[]; total: number }) => void;
  query: string;
  pageSize: number;
  setPageSize: (size: number) => void;
  page: number;
  setPage: (page: number) => void;
  sortBy: SortOptions;
  setSortBy: (sort: SortOptions) => void;
}

// Create the context
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Filter Provider component
export function FilterProvider({ children }: { children: ReactNode }) {
  // States for filters
  const [category, setCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.TITLE_ASC);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("/api/products");
  const [data, setData] = useState<{ products: Product[]; total: number }>({
    products: [],
    total: 0,
  });

  const handleChange = async () => {
    const queryParameters = [];

    const sort =
      sortBy === SortOptions.TITLE_ASC || sortBy === SortOptions.TITLE_DESC
        ? "title"
        : "price";
    const order =
      sortBy === SortOptions.TITLE_ASC || sortBy === SortOptions.PRICE_ASC
        ? "asc"
        : "desc";

    if (category) queryParameters.push(`category=${category}`);
    if (searchTerm && searchTerm.length > 0)
      queryParameters.push(`q=${searchTerm}`);
    if (minPrice) queryParameters.push(`price_min=${minPrice}`);
    if (maxPrice) queryParameters.push(`price_max=${maxPrice}`);

    queryParameters.push(`sortBy=${sort}`);
    queryParameters.push(`order=${order}`);
    queryParameters.push(`limit=${pageSize}`);
    queryParameters.push(`skip=${page}`);

    const queryString =
      queryParameters.length > 0 ? `?${queryParameters.join("&")}` : "";
    const queryUrl = `/api/products${queryString}`;

    setQuery(queryUrl);
  };

  useEffect(() => {
    handleChange();
  }, [category, searchTerm, minPrice, maxPrice, pageSize, page, sortBy]);

  const value = {
    category,
    setCategory,
    searchTerm,
    setSearchTerm,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    data,
    setData,
    query,
    pageSize,
    setPageSize,
    page,
    setPage,
    sortBy,
    setSortBy,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

// Custom hook to use the Filter Context
export function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
}
