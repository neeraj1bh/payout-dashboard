import axios from "axios";

const PAYOUT_API_URL = "https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test";

const SEARCH_API_URL = "https://theseus-staging.medley.gg/api/v1/analytics/tech-test";

export const fetchAPI = async (page: number, limit: number) => {
  const { data } = await axios.get(`${PAYOUT_API_URL}/payouts`, {
    params: {
      page,
      limit,
    },
  });

  return data;
};

export const searchAPI = async (search: string) => {
  const { data } = await axios.get(`${SEARCH_API_URL}/search`, {
    params: { query: search },
  });
  return data;
};
