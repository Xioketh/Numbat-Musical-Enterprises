import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {DashbordService} from "../../../Services/dashbord.service";
import {ProductService} from "../../../Services/product.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  countObj:any=[];

  displayedColumns: string[] = [
    'image1',
    'productID',
    'productName',
    'qty',
    'price',
    'category'
  ];
  dataSource!: MatTableDataSource<any>;

  constructor(private httpClient: HttpClient, private dashBoardService: DashbordService, private productService: ProductService){
    this.getCount();
    this.getAllProducts();
  }

  getCount(){
    this.dashBoardService.getCount().subscribe(
      (response) => {
        this.countObj=response;
        console.log(this.countObj);

      },
    );
  }

  getAllProducts() {
    this.productService.getLatestProducts().subscribe(
      (response) => {
        console.log(response);

        this.dataSource = new MatTableDataSource(response);

      },
      (error) => {
        console.error('Error product:', error);
      }
    );
  }

}
