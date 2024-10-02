import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "@/components/products/ProductCard";

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
    sortBy: { field: string; order: string };
    setSortBy: (sort: { field: string; order: string }) => void;
}

// Create the context
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Filter Provider component
export const FilterProvider = ({ children }: { children: ReactNode }) => {
    // States for filters
    const [category, setCategory] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [minPrice, setMinPrice] = useState<number>();
    const [maxPrice, setMaxPrice] = useState<number>();
    const [pageSize, setPageSize] = useState(10);
    const [sortBy, setSortBy] = useState<{ field: string; order: string }>({
        field: "title",
        order: "desc",
    });
    const [page, setPage] = useState(0);
    const [query, setQuery] = useState("/api/products");
    const [data, setData] = useState<{ products: Product[]; total: number }>({
        products: [],
        total: 0,
    });

    const handleChange = async () => {
        const queryParameters = [];

        if (category) queryParameters.push(`category=${category}`);
        if (searchTerm && searchTerm.length > 0)
            queryParameters.push(`q=${searchTerm}`);
        if (minPrice) queryParameters.push(`price_min=${minPrice}`);
        if (maxPrice) queryParameters.push(`price_max=${maxPrice}`);
        if (sortBy)
            queryParameters.push(`sortBy=${sortBy.field}&order=${sortBy.order}`);
        queryParameters.push(`limit=${pageSize}`);
        queryParameters.push(`skip=${page}`);

        const queryString =
            queryParameters.length > 0 ? `?${queryParameters.join("&")}` : "";
        const queryUrl = `/api/products${queryString}`;
        setQuery(queryUrl);
    };

    useEffect(() => {
        handleChange();
    }, [
        category,
        searchTerm,
        minPrice,
        maxPrice,
        pageSize,
        page,
        sortBy.order,
        sortBy.field,
    ]);

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
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
};

// Custom hook to use the Filter Context
export const useFilterContext = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilterContext must be used within a FilterProvider");
    }
    return context;
};