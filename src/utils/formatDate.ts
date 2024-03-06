import moment from "moment";

export const formatDate = (dateStr: string): string => {
  return moment(dateStr).format("ddd, MMM D, HH:mm");
};
