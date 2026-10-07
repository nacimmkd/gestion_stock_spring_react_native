package com.nacimmkd.gestion_stock_api.services;

import com.nacimmkd.gestion_stock_api.models.Product;
import com.nacimmkd.gestion_stock_api.models.StockStatus;
import jakarta.persistence.criteria.Path;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public final class ProductSpecs {

    private ProductSpecs() {}

    public static Specification<Product> nameContains(String search) {
        return (root, query, cb) -> {
            if (search == null || search.isBlank()) return null;
            return cb.like(cb.lower(root.get("name")), "%" + search.trim().toLowerCase() + "%");
        };
    }

    public static Specification<Product> hasCategory(UUID categoryId) {
        return (root, query, cb) -> {
            if (categoryId == null) return null;
            return cb.equal( root.get("category").get("id"), categoryId );
        };
    }

    public static Specification<Product> hasStatus(StockStatus status) {
        return (root, query, cb) -> {
            if (status == null) return null;

            Path<Integer> quantity = root.get("quantity");
            Path<Integer> threshold = root.get("alertThreshold");

            return switch (status) {
                case RUPTURE -> cb.equal(quantity, 0);
                case FAIBLE -> cb.and(
                        cb.greaterThan(quantity, 0),
                        cb.lessThanOrEqualTo(quantity, threshold)
                );
                case NORMAL -> cb.greaterThan(quantity, threshold);
            };
        };
    }
}
