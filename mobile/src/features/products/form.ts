import type { ZodError } from "zod";
import {ProductDetails} from "../../shared/api/types";

export type ProductFormValues = {
    name: string;
    reference: string;
    categoryId: string | null;
    quantity: string;
    alertThreshold: string;
    description: string;
};

export type ProductFormErrors = Partial<Record<keyof ProductFormValues, string>>;

export const EMPTY_PRODUCT_FORM: ProductFormValues = {
    name: "",
    reference: "",
    categoryId: null,
    quantity: "",
    alertThreshold: "",
    description: "",
};


export function toFormErrors(error: ZodError): ProductFormErrors {
    const errors: ProductFormErrors = {};

    for (const issue of error.issues) {
        const field = issue.path[0] as keyof ProductFormValues;
        errors[field] ??= issue.message;
    }

    return errors;
}

export function toFormValues(product: ProductDetails): ProductFormValues {
    return {
        name: product.name ?? "",
        reference: product.reference ?? "",
        categoryId: product.category?.id ?? null,
        quantity: String(product.quantity ?? ""),
        alertThreshold: String(product.alertThreshold ?? ""),
        description: product.description ?? "",
    };
}