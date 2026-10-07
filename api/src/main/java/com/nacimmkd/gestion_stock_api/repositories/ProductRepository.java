package com.nacimmkd.gestion_stock_api.repositories;

import com.nacimmkd.gestion_stock_api.models.Product;
import org.jspecify.annotations.NonNull;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {

    @Override
    @EntityGraph(attributePaths = "category")
    List<Product> findAll();

    @Override
    @EntityGraph(attributePaths = "category")
    Optional<Product> findById(@NonNull UUID id);

    boolean existsByReference(String reference);

    boolean existsByReferenceAndIdNot(String reference, UUID id);
}
