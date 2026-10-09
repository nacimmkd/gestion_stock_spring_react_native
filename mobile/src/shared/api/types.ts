import type { components } from './generated/schema';

type Schemas = components['schemas'];

export type Category = Schemas['CategoryDto'];

export type ProductSummary = Schemas['ProductSummaryDto'];
export type ProductDetails = Schemas['ProductDetailsDto'];
export type ProductPage = Schemas['PageProductSummaryDto'];
export type CategoryCount = Schemas['CategoryCountDto'];
export type Dashboard = Schemas['DashboardDto'];
export type StockStatus = NonNullable<ProductSummary['status']>;
export type ProductCreateRequest = Schemas['ProductCreateRequest'];
export type ProductUpdateRequest = Schemas['ProductUpdateRequest'];
export type StockUpdateRequest = Schemas['StockUpdateRequest'];
export type StockMovement = 'ENTREE' | 'SORTIE';
export type PagedProduct = Schemas['PageProductSummaryDto'];

export type ApiError = { message: string };
export type ValidationErrors = Record<string, string>;

export interface ProductFilters {
    search?: string;
    status?: StockStatus;
    page?: number;
    size?: number;
}