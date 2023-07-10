import { ONE_PAGE } from "common"

export const getSkipValue = (currentPage: number, limit: number): number => {

   return (currentPage - ONE_PAGE) * limit
}