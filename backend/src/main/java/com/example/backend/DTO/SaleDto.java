package com.example.backend.DTO;


import com.example.backend.Model.Products;
import com.example.backend.Model.SaleItems;
import com.example.backend.Model.Users;

import javax.persistence.Column;
import java.util.List;
import java.util.Optional;

public class SaleDto {

    private String saleId;
    private String userId;
    private int totalAmount;
    private int finalAmount;
    private int discount_rate;
    private String soldDate;
    private String payment_type;
    private int qtyTot;
    private int itemizedTotalAmount;
    private int initialQty;
    private int status;
    private boolean isFullPayment;
    private List<ProductsDto> productsDto;
    private List<Products> products;
    private Optional<Products> productData;
    private List<SaleItems> saleItems;
    private List<SaleItemsDto> saleItemsDtos;
    private Optional<Users> users;

    private double depositAmount;
    private double mounthly_payment;
    private double depositRate;
    private int remainingMounths;


    public SaleDto(Optional<Products> productData, List<SaleItems> saleItems, String saleId, String userId, int totalAmount, String soldDate, int qtyTot) {
        this.saleId = saleId;
        this.userId = userId;
        this.totalAmount = totalAmount;
        this.soldDate = soldDate;
        this.qtyTot = qtyTot;
        this.saleItems = saleItems;
        this.productData = productData;
    }

    public boolean isFullPayment() {
        return isFullPayment;
    }

    public String getPayment_type() {
        return payment_type;
    }

    public void setPayment_type(String payment_type) {
        this.payment_type = payment_type;
    }

    public void setFullPayment(boolean fullPayment) {
        isFullPayment = fullPayment;
    }

    public SaleDto() {
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
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

    public int getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }

    public int getFinalAmount() {
        return finalAmount;
    }

    public void setFinalAmount(int finalAmount) {
        this.finalAmount = finalAmount;
    }

    public int getDiscount_rate() {
        return discount_rate;
    }

    public void setDiscount_rate(int discount_rate) {
        this.discount_rate = discount_rate;
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

    public int getItemizedTotalAmount() {
        return itemizedTotalAmount;
    }

    public void setItemizedTotalAmount(int itemizedTotalAmount) {
        this.itemizedTotalAmount = itemizedTotalAmount;
    }

    public int getInitialQty() {
        return initialQty;
    }

    public void setInitialQty(int initialQty) {
        this.initialQty = initialQty;
    }

    public List<ProductsDto> getProductsDto() {
        return productsDto;
    }

    public void setProductsDto(List<ProductsDto> productsDto) {
        this.productsDto = productsDto;
    }

    public List<Products> getProducts() {
        return products;
    }

    public void setProducts(List<Products> products) {
        this.products = products;
    }

    public Optional<Products> getProductData() {
        return productData;
    }

    public void setProductData(Optional<Products> productData) {
        this.productData = productData;
    }

    public List<SaleItems> getSaleItems() {
        return saleItems;
    }

    public void setSaleItems(List<SaleItems> saleItems) {
        this.saleItems = saleItems;
    }

    public List<SaleItemsDto> getSaleItemsDtos() {
        return saleItemsDtos;
    }

    public void setSaleItemsDtos(List<SaleItemsDto> saleItemsDtos) {
        this.saleItemsDtos = saleItemsDtos;
    }

    public Optional<Users> getUsers() {
        return users;
    }

    public void setUsers(Optional<Users> users) {
        this.users = users;
    }

    public double getDepositAmount() {
        return depositAmount;
    }

    public void setDepositAmount(double depositAmount) {
        this.depositAmount = depositAmount;
    }

    public double getMounthly_payment() {
        return mounthly_payment;
    }

    public void setMounthly_payment(double mounthly_payment) {
        this.mounthly_payment = mounthly_payment;
    }

    public double getDepositRate() {
        return depositRate;
    }

    public void setDepositRate(double depositRate) {
        this.depositRate = depositRate;
    }

    public int getRemainingMounths() {
        return remainingMounths;
    }

    public void setRemainingMounths(int remainingMounths) {
        this.remainingMounths = remainingMounths;
    }
}

