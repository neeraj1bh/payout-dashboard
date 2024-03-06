import axios from "axios";

const PAYOUT_API_URL =
  "https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test";

const SEARCH_API_URL =
  "https://theseus-staging.medley.gg/api/v1/analytics/tech-test";

export const fetchAPI = async (page: number, limit: number) => {
  try {
    const { data } = await axios.get(`${PAYOUT_API_URL}/payouts`, {
      params: {
        page,
        limit,
      },
    });

    return data;
  } catch (error) {
    console.error("Some error occured in fetchAPI", error);
    throw error;
  }
};

export const searchAPI = async (search: string) => {
  try {
    const { data } = await axios.get(`${SEARCH_API_URL}/search`, {
      params: { query: search },
    });
    return data;
  } catch (error) {
    console.error("Some error occured in searchAPI", error);
    throw error;
  }
};
