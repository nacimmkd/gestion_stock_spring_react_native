package com.nacimmkd.gestion_stock_api.repositories;

import com.nacimmkd.gestion_stock_api.models.CategoryCount;
import com.nacimmkd.gestion_stock_api.models.Product;
import com.nacimmkd.gestion_stock_api.models.StockStats;
import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID>, JpaSpecificationExecutor<Product> {

    @Override
    @EntityGraph(attributePaths = "category")
    Page<Product> findAll(@NonNull Specification<Product> spec, @NonNull Pageable pageable);

    @Override
    @EntityGraph(attributePaths = "category")
    Optional<Product> findById(@NonNull UUID id);

    boolean existsByReference(String reference);

    boolean existsByReferenceAndIdNot(String reference, UUID id);

    @Query("""
        SELECT COUNT(p) AS totalProducts,
               COALESCE(SUM(p.quantity), 0) AS totalQuantity,
               COUNT(p) FILTER (WHERE p.quantity > p.alertThreshold) AS normalStock,
               COUNT(p) FILTER (WHERE p.quantity = 0) AS outOfStock,
               COUNT(p) FILTER (WHERE p.quantity > 0 AND p.quantity <= p.alertThreshold) AS lowStock
        FROM Product p
        """)
    StockStats getStockStats();

    @Query("""
        SELECT c.name AS category, COUNT(p) AS count
        FROM Product p JOIN p.category c
        GROUP BY c.name
        ORDER BY COUNT(p) DESC
        """)
    List<CategoryCount> countByCategory();

    @Query("""
        SELECT COUNT(p)
        FROM Product p
        WHERE p.quantity = 0
        """)
    long countOutOfStock();
}
