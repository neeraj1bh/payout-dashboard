"use client";

import React, { useState, useEffect, useRef, useMemo, FC } from "react";
import {
  StyledChip,
  StyledFooter,
  StyledPayout,
  StyledPayoutHeader,
  StyledSpacer,
  StyledWrapper,
} from "./PayoutWrapper.styled";
import SearchBar from "../SearchBar";
import { searchAPI } from "@/utils/api";
import { fetchAPI } from "@/utils/api";
import PayoutTable from "../PayoutTable";
import Select from "react-select";
import { PageSizes } from "@/utils/pageSizes";
import Pagination from "../Pagination";

type ErrorState = Error | null;

interface PayoutData {
  dateAndTime: string;
  status: "Pending" | "Completed";
  value: string;
  username: string;
}

interface ApiData {
  metadata: {
    page: number;
    limit: number;
    totalCount: number;
  };
  data: PayoutData[];
}

const PayoutList: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PageSizes[0]);
  const [totalPages, setTotalPages] = useState(1);

  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorState>(null);

  const initialRender = useRef(true);

  const fetchWithoutSearchTerm = async (page: number, pageSize: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchAPI(page, pageSize);
      setSearchData(response.data);
      setTotalPages(Math.ceil(response.metadata.totalCount / pageSize));
    } catch (error) {
      setError(error as Error);
      console.error("Some error occured in fetchWithoutSearchTerm", error);
    }

    setLoading(false);
  };

  const fetchWithSearchTerm = async (searchValue: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await searchAPI(searchValue);
      setSearchData(response);
      const totalPages = Math.ceil(response.length / pageSize.value);
      setCurrentPage(totalPages < currentPage ? totalPages : currentPage);
      setTotalPages(totalPages);
    } catch (error) {
      setError(error as Error);
      console.error("Some error occured in fetchWithSearchTerm", error);
    }
    setLoading(false);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (!value) {
      fetchWithoutSearchTerm(currentPage, pageSize.value);
    } else fetchWithSearchTerm(value);
  };

  const handlePageClick = (selected: number) => {
    setCurrentPage(selected);
    if (!searchValue) {
      fetchWithoutSearchTerm(selected, pageSize.value);
    }
  };

  const handlePageSizeChange = (newValue: { label: string; value: number }) => {
    setPageSize(newValue);
    if (searchValue) {
      fetchWithSearchTerm(searchValue);
    } else {
      fetchWithoutSearchTerm(currentPage, newValue?.value);
    }
  };

  // api call on first load, we should avoid useEffects unless it is absolutely necessary
  useEffect(() => {
    if (initialRender.current) {
      fetchWithoutSearchTerm(currentPage, pageSize.value);
      initialRender.current = false;
    }
  }, []);

  // makes sure  pagination also works with search response
  const listData = useMemo(() => {
    if (!searchValue) return searchData;
    const startIndex = pageSize.value * (currentPage - 1);
    return searchData.slice(startIndex, startIndex + pageSize.value);
  }, [searchValue, pageSize, currentPage, searchData]);

  const showTable = !loading && !error && searchData.length > 0;

  return (
    <StyledWrapper>
      <StyledSpacer>
        <StyledPayout>
          <StyledChip />
          <StyledPayoutHeader>Payout History</StyledPayoutHeader>
        </StyledPayout>
        <SearchBar onChange={handleSearch} />
      </StyledSpacer>
      {loading && <div>Loading...</div>}
      {showTable && <PayoutTable data={listData} />}{" "}
      <StyledFooter>
        <Select
          instanceId="my-select"
          options={PageSizes}
          value={pageSize}
          onChange={(value) => {
            if (value) handlePageSizeChange(value);
          }}
          defaultValue={PageSizes[0]}
          menuPlacement="auto"
        />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageClick}
        />
      </StyledFooter>
    </StyledWrapper>
  );
};

export default PayoutList;
