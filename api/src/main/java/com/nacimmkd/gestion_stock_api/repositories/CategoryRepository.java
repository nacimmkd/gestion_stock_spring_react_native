package com.nacimmkd.gestion_stock_api.repositories;

import com.nacimmkd.gestion_stock_api.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
}
