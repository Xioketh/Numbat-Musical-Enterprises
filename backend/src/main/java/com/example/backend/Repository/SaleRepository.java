package com.example.backend.Repository;

import com.example.backend.Model.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface SaleRepository extends JpaRepository<Sales,Long> {

    @Query(value = "SELECT MAX(id) AS latest_id FROM sales;", nativeQuery = true)
    String lastID();

    @Query(value = "SELECT * FROM sales;", nativeQuery = true)
    List<Sales> getAllSales();

    @Query(value = "SELECT * FROM sales WHERE user_id = ?1", nativeQuery = true)
    List<Sales> getCustomerSales(String userId);

//    @Query(value = "SELECT * FROM sales WHERE sold_date BETWEEN ?1 AND ?2", nativeQuery = true)
//    List<SaleDto> getReportData(String startDate, String endDate);
    @Query(value = "SELECT * FROM sales WHERE sold_date BETWEEN ?1 AND ?2", nativeQuery = true)
    List<Sales> getReportData(String startDate, String endDate);

//    @Query(value = "SELECT * FROM sales WHERE sold_date BETWEEN :startDate AND :endDate", nativeQuery = true)
//    List<SaleDto> getReportData(@Param("startDate") Date startDate, @Param("endDate") Date endDate);


//    @Query(value = "SELECT * FROM sales WHERE sold_date BETWEEN (?1, 'YYYY-MM-DD') AND TO_DATE(?2, 'YYYY-MM-DD')", nativeQuery = true)
//    List<SaleDto> getReportData(String startDate, String endDate);
}
