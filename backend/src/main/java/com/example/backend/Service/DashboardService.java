package com.example.backend.Service;


import com.example.backend.Model.Products;
import com.example.backend.Model.Sales;
import com.example.backend.Model.Users;
import com.example.backend.Repository.ProductRepository;
import com.example.backend.Repository.SaleRepository;
import com.example.backend.Repository.UsersRepository;
import com.example.backend.ServiceImpl.ProductServiceImpl;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    @Autowired
    ProductServiceImpl productServiceImpl;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    SaleRepository saleRepository;

    @Autowired
    UsersRepository usersRepository;

    public ResponseEntity<?> getCount(){
        try {
            JSONObject obj = new JSONObject();
            List<Products> allProducts=productRepository.getActiveAndNonActivePoducts();
            List<Sales> allSales=saleRepository.getAllSales();
            List<Users> users=usersRepository.getAll();

            long allActiveProductsCount = allProducts.stream()
                    .filter(product -> product.getStatus() == 1)
                    .count();

            long allOutProductsCount = allProducts.stream()
                    .filter(product -> product.getQty() == 0)
                    .count();

            int totalAmount = allSales.stream()
                    .mapToInt(Sales::getFinalAmount)
                    .sum();

            int totalQtySold = allSales.stream()
                    .mapToInt(Sales::getQtyTot)
                    .sum();

            obj.put("allOutProductsCount", allOutProductsCount);
            obj.put("allProductsCount", allProducts.size());
            obj.put("allActiveProductsCount", allActiveProductsCount);
            obj.put("allSalesCount", allSales.size());
            obj.put("allUsersCount", users.size()-1);
            obj.put("totalSalesAmount", totalAmount);
            obj.put("totalQtySold", totalQtySold);

            return ResponseEntity.ok(obj);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving count data");
        }

    }
}
