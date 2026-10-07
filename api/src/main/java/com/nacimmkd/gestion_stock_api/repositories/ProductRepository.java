package com.nacimmkd.gestion_stock_api.repositories;

import com.nacimmkd.gestion_stock_api.models.Product;
import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

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
}
