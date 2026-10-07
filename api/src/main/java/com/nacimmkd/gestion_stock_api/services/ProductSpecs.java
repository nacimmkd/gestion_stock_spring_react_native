package com.nacimmkd.gestion_stock_api.services;

import com.nacimmkd.gestion_stock_api.models.Product;
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
}
