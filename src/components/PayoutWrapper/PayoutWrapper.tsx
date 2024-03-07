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
import { searchAPI } from "@/utils/api";
import { fetchAPI } from "@/utils/api";
import Select from "react-select";
import { PageSizes } from "@/utils/pageSizes";
import toast from "react-hot-toast";
import { PayoutTable } from "../Table";
import { SearchBar } from "../SearchBar";
import { Pagination } from "../Pagination";
import { debounce } from "@/utils/debounce";

const PayoutWrapper: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PageSizes[0]);
  const [totalPages, setTotalPages] = useState(1);

  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
      toast.error("Something went wrong, please try again later", {
        position: "bottom-center",
      });
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

      if (totalPages === 0) {
        setCurrentPage(1);
      } else if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }

      setTotalPages(totalPages < 1 ? 1 : totalPages);
    } catch (error) {
      setError(error as Error);
      toast.error("Something went wrong, please try again later", {
        position: "bottom-center",
      });
    }
    setLoading(false);
  };

  const handleSearch = debounce((value: string) => {
    setSearchValue(value);
    if (!value) {
      fetchWithoutSearchTerm(currentPage, pageSize.value);
    } else fetchWithSearchTerm(value);
  }, 500);

  const handlePageClick = (selected: number) => {
    setCurrentPage(selected);
    if (!searchValue) {
      fetchWithoutSearchTerm(selected, pageSize.value);
    }
  };

  const handlePageSizeChange = (newValue: { label: string; value: number }) => {
    setPageSize(newValue);
    setTotalPages(Math.ceil(searchData.length / newValue.value));
    if (!searchValue) {
      fetchWithoutSearchTerm(currentPage, newValue?.value);
    }
  };

  // api call on first load, we should avoid useEffects unless it is absolutely necessary
  useEffect(() => {
    if (initialRender.current) {
      fetchWithoutSearchTerm(currentPage, pageSize.value);
      initialRender.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // makes sure  pagination also works with search response
  const listData = useMemo(() => {
    if (!searchValue) return searchData;
    const startIndex = pageSize.value * (currentPage - 1);
    return searchData.slice(startIndex, startIndex + pageSize.value);
  }, [searchValue, pageSize, currentPage, searchData]);

  return (
    <StyledWrapper>
      <StyledSpacer>
        <StyledPayout>
          <StyledChip />
          <StyledPayoutHeader>Payout History</StyledPayoutHeader>
        </StyledPayout>
        <SearchBar onChange={handleSearch} />
      </StyledSpacer>
      <PayoutTable data={listData} loading={loading} error={error?.message || ""} />
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

export default PayoutWrapper;
