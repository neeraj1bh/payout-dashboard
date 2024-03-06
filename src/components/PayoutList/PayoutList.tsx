"use client";

import React, { useState, useEffect, useRef, FC } from "react";
import {
  StyledChip,
  StyledPayout,
  StyledPayoutHeader,
  StyledSpacer,
  StyledWrapper,
} from "./PayoutList.styled";
import SearchBar from "../SearchBar";
import { searchAPI } from "@/utils/api";
import { fetchAPI } from "@/utils/api";
import PayoutItem from "../PayoutItem";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorState>(null);

  const initialRender = useRef(true);

  const fetchWithoutSearchTerm = async (page: number, pageSize: number) => {
    setLoading(true);

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

    try {
      const response = await searchAPI(searchValue);
      setSearchData(response);
      setCurrentPage(totalPages < currentPage ? totalPages : currentPage);
      setTotalPages(totalPages);
    } catch (error) {
      setError(error as Error);
      console.error("Some error occured in fetchWithSearchTerm", error);
    }
    setLoading(false);
  };

  const handleSearch = (value: string) => {
    if (!value) {
      fetchWithoutSearchTerm(currentPage, 10);
    } else fetchWithSearchTerm(value);
  };

  // api call on first load, we should avoid useEffects unless it is absolutely necessary
  useEffect(() => {
    if (initialRender.current) {
      fetchWithoutSearchTerm(currentPage, 10);
      initialRender.current = false;
    }
  }, []);

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
      {!loading && (
        <>
          <PayoutItem data={searchData} />
        </>
      )}
    </StyledWrapper>
  );
};

export default PayoutList;
