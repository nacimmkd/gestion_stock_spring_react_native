package com.nacimmkd.gestion_stock_api.services;

import com.nacimmkd.gestion_stock_api.dtos.DashboardDto;
import com.nacimmkd.gestion_stock_api.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProductRepository productRepository;

    public DashboardDto getDashboard() {
        var stats = this.productRepository.getStockStats();
        var productsByCategory = this.productRepository.countByCategory();
        return DashboardDto.of(stats, productsByCategory);
    }
}
