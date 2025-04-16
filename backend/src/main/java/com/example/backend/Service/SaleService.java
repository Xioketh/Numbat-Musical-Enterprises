package com.example.backend.Service;

import com.example.backend.DTO.ProductsDto;
import com.example.backend.DTO.SaleDto;
import com.example.backend.DTO.SaleItemsDto;
import com.example.backend.Model.Products;
import com.example.backend.Model.SaleItems;
import com.example.backend.Model.Sales;
import com.example.backend.Repository.ProductRepository;
import com.example.backend.Repository.SaleItemRepository;
import com.example.backend.Repository.SaleRepository;
import com.example.backend.Repository.UsersRepository;
import com.example.backend.ServiceImpl.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private SaleItemRepository saleItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private ProductServiceImpl productService;

    public ResponseEntity<?> saveSale(SaleDto saleDto) {

        try {
            String currentId = saleRepository.lastID();
            String nextID="";
            List<ProductsDto> products = saleDto.getProductsDto();

            if (currentId !=null){
                int nextNumericValue = Integer.parseInt(currentId) + 1;
                nextID = String.format("S%04d", nextNumericValue);
            }else{
                nextID = String.format("S%04d", 1);
            }

            LocalDate currentDate = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            String formattedDate = currentDate.format(formatter);

            Sales sales=new Sales();

            sales.setSoldDate(formattedDate);
            sales.setSaleId(nextID);
            sales.setTotalAmount(saleDto.getTotalAmount());
            sales.setUserId(saleDto.getUserId());
            sales.setQtyTot(saleDto.getQtyTot());

            sales = saleRepository.save(sales);

            for (ProductsDto product : products) {
                SaleItems saleItems=new SaleItems();
                saleItems.setSaleId(nextID);
                saleItems.setQty(product.getInitialQty());
                saleItems.setTotalAmount(product.getItemizedTotalAmount());
                saleItems.setProductId(product.getProductID());

                saleItems = saleItemRepository.save(saleItems);
                int newQty =product.getQty()-product.getInitialQty();
                productRepository.updateQty(newQty, product.getProductID());
            }
            return ResponseEntity.ok(sales);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public ResponseEntity<?> getAllSales() {
        try {
            List<Sales> sales = saleRepository.getAllSales();

            List<SaleDto> saleDtos = sales.stream()
                    .map(this::convertSalesToSalesDTO)
                    .collect(Collectors.toList());

            for (SaleDto saleDto : saleDtos) {
                try {
                    List<SaleItems> saleItems = saleItemRepository.getSaleItems(saleDto.getSaleId());
                    List<Products> products = new ArrayList<>();
                    for (SaleItems saleItem : saleItems) {
                        try {
                            List<Products> product = productRepository.getProductById(saleItem.getProductId());
                            products.addAll(product);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                    saleDto.setProducts(products);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            return ResponseEntity.ok(saleDtos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    public SaleDto convertSalesToSalesDTO(Sales sales){
        SaleDto saleDto = new SaleDto();
        saleDto.setSaleId(sales.getSaleId());
        saleDto.setQtyTot(sales.getQtyTot());
        saleDto.setUserId(sales.getUserId());
        saleDto.setTotalAmount(sales.getTotalAmount());
        saleDto.setSoldDate(sales.getSoldDate());

        return saleDto;
    }

    public SaleItemsDto convertSaleItemsToSalesItemDTO(SaleItems saleItems){
        SaleItemsDto saleItemsDto = new SaleItemsDto();
        saleItemsDto.setQty(saleItems.getQty());
        saleItemsDto.setSaleId(saleItems.getSaleId());
        saleItemsDto.setProductId(saleItems.getProductId());
        saleItemsDto.setTotalAmount(saleItems.getTotalAmount());

        return saleItemsDto;
    }

    public ResponseEntity<?> getCustomerSales(SaleDto saleDto) {
        try {
            String userId = saleDto.getUserId();
            List<Sales> sales = saleRepository.getCustomerSales(userId);

            List<SaleDto> saleDtos = sales.stream()
                    .map(this::convertSalesToSalesDTO)
                    .collect(Collectors.toList());


            for (SaleDto dto : saleDtos) {

                List<SaleItems> saleItems = saleItemRepository.getSaleItems(dto.getSaleId());

                List<SaleItemsDto> saleItemsDtoList = saleItems.stream()
                        .map(this::convertSaleItemsToSalesItemDTO)
                        .collect(Collectors.toList());

                List<SaleItemsDto> saleItemsWithProducts = new ArrayList<>();

                for (SaleItemsDto saleItemsDto : saleItemsDtoList) {
                    Optional<Products> product = productRepository.getProductByIdOptional(saleItemsDto.getProductId());
                    saleItemsDto.setProducts(product.get());
                    saleItemsWithProducts.add(saleItemsDto);
                }

                dto.setSaleItemsDtos(saleItemsWithProducts);
            }

            return ResponseEntity.ok(saleDtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }


    public ResponseEntity<?> getSelectedSale(SaleItemsDto saleItemsDto) {
        try {
            String saleId = saleItemsDto.getSaleId();
            List<SaleItems> sales = saleItemRepository.getSelectedSale(saleId);
            return ResponseEntity.ok(sales);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    public ResponseEntity<?> getReportData(String startDate, String endDate) {
        try {
            List<Sales> sales = saleRepository.getReportData(startDate,endDate);
            if (sales.isEmpty()) {
                return ResponseEntity.ok("No sales data found between " + startDate + " and " + endDate);
            }
            return ResponseEntity.ok(sales);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

//    public ResponseEntity<?> getReportData(String startDate, String endDate) {
//        try {
//            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//            Date start = dateFormat.parse(startDate);
//            Date end = dateFormat.parse(endDate);
//
//            System.out.println("start:: " + startDate);
//            System.out.println("end:: " + endDate);
//
//            List<SaleDto> sales = saleRepository.getReportData(start, end);
//
//            if (sales.isEmpty()) {
//                return ResponseEntity.ok("No sales data found between " + startDate + " and " + endDate);
//            }
//
//            for (SaleDto sale : sales) {
//                Optional<Users> users = usersRepository.findByUserId(sale.getUserId());
//                users.ifPresent(sale::setUsers);
//            }
//
//            return ResponseEntity.ok(sales);
//
//        } catch (ParseException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid date format. Use yyyy-MM-dd");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
//        }
//    }

}
