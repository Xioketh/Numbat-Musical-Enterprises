package com.example.backend.DTO;


import com.example.backend.Model.Products;
import com.example.backend.Model.SaleItems;
import com.example.backend.Model.Users;

import java.util.List;
import java.util.Optional;

public class SaleDto {

    private String saleId;
    private String userId;
    private int totalAmount;
    private String soldDate;
    private int qtyTot;
    private int itemizedTotalAmount;
    private int initialQty;
    private List<ProductsDto> productsDto;
    private List<Products> products;
    private Optional<Products> productData;
    private List<SaleItems> saleItems;
    private List<SaleItemsDto> saleItemsDtos;
    private Optional<Users> users;

    public Optional<Products> getProductData() {
        return productData;
    }

    public SaleDto(Optional<Products> productData, List<SaleItems> saleItems, String saleId, String userId, int totalAmount, String soldDate, int qtyTot) {
        this.saleId = saleId;
        this.userId = userId;
        this.totalAmount = totalAmount;
        this.soldDate = soldDate;
        this.qtyTot = qtyTot;
        this.saleItems = saleItems;
        this.productData = productData;
    }


    public List<SaleItemsDto> getSaleItemsDtos() {
        return saleItemsDtos;
    }

    public void setSaleItemsDtos(List<SaleItemsDto> saleItemsDtos) {
        this.saleItemsDtos = saleItemsDtos;
    }

    public SaleDto() {
    }

    public String getSaleId() {
        return saleId;
    }

    public void setSaleId(String saleId) {
        this.saleId = saleId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setProductData(Optional<Products> productData) {
        this.productData = productData;
    }

    public int getItemizedTotalAmount() {
        return itemizedTotalAmount;
    }

    public void setItemizedTotalAmount(int itemizedTotalAmount) {
        this.itemizedTotalAmount = itemizedTotalAmount;
    }

    public List<Products> getProducts() {
        return products;
    }

    public void setProducts(List<Products> products) {
        this.products = products;
    }

    public int getInitialQty() {
        return initialQty;
    }

    public void setInitialQty(int initialQty) {
        this.initialQty = initialQty;
    }

    public List<SaleItems> getSaleItems() {
        return saleItems;
    }

    public void setSaleItems(List<SaleItems> saleItems) {
        this.saleItems = saleItems;
    }

    public int getTotalAmount() {
        return totalAmount;
    }

    public Optional<Users> getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = Optional.ofNullable(users);
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getSoldDate() {
        return soldDate;
    }

    public void setSoldDate(String soldDate) {
        this.soldDate = soldDate;
    }

    public int getQtyTot() {
        return qtyTot;
    }

    public void setQtyTot(int qtyTot) {
        this.qtyTot = qtyTot;
    }

    public List<ProductsDto> getProductsDto() {
        return productsDto;
    }

    public void setProductsDto(List<ProductsDto> productsDto) {
        this.productsDto = productsDto;
    }
}

