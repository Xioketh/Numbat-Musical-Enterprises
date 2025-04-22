import {AfterViewInit, Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {ProductService} from "../../../Services/product.service";
import {DashbordService} from "../../../Services/dashbord.service";
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-admin-products-list',
  templateUrl: './admin-products-list.component.html',
  styleUrl: './admin-products-list.component.css'
})
export class AdminProductsListComponent{
  countObj: any = [];
  displayedColumns: string[] = [
    'image1',
    'productID',
    'productName',
    'qty',
    'price',
    'category',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  products: any = [];
  selectedProduct: any = [];

  productForm: FormGroup = new FormGroup({});

  enableEdit: boolean = false;
  barcodeReady: boolean = false;

  modalRef: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('productPopup') productPopup: ElementRef | undefined;
  @ViewChild('barcodeCanvas', { static: false }) barcodeCanvas!: ElementRef;
  constructor(private fb: FormBuilder, private productService: ProductService, private modal: NgbModal, private dashBoardService: DashbordService, private zone: NgZone) {
    this.getAllProducts();
    this.getCount();
  }



  generateBarcode(): void {
    try {
      // Make sure the DOM element is available
      if (document.getElementById('productBarcode')) {
        JsBarcode('#productBarcode', this.selectedProduct.productID, {
          format: 'CODE128',
          width: 2,
          height: 50,
          displayValue: false,
          margin: 10,
          background: '#ffffff',
          lineColor: '#000000'
        });
      }
    } catch (error) {
      console.error('Error generating barcode:', error);
    }
  }



  getCount() {
    this.dashBoardService.getCount().subscribe(
      (response) => {
        this.countObj = response;
      },
    );
  }

  stockValidate(event) {
    const qty = event.target.value;
    if (qty < 0) {
      Swal.fire({
        title: 'Please Enter Valid Stock!',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.productForm.patchValue({
            qty: this.selectedProduct.qty,
          });
        }
      });
    }
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (response) => {
        this.products = response;
        this.createForm();
        console.log(response);

      },
      (error) => {
        console.error('Error product:', error);
      }
    );
  }

  createForm() {
    this.productForm = this.fb.group({
      category: [''],
      createDate: [''],
      price: [''],
      qty: [''],
      description: [''],
      productName: [''],
      productID: ['']
    });
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  closePopup() {
    this.modalRef.close();
  }

  productPreview(selectedProducts: any, i: number) {
    this.selectedProduct = selectedProducts;

    this.productForm.patchValue({
      category: this.selectedProduct.category,
      createDate: this.selectedProduct.createDate,
      price: this.selectedProduct.price,
      qty: this.selectedProduct.qty,
      description: this.selectedProduct.description,
      productName: this.selectedProduct.productName,
      productID: this.selectedProduct.productID
    });

    this.modalRef = this.modal.open(this.productPopup, { centered: true });
    this.enableEdit = i === 1;

    setTimeout(() => {
      this.generateBarcode();
    }, 300);
  }

  productDelete(selectedProducts: any) {

    const paylord = {
      productID: selectedProducts.productID
    }

    Swal.fire({
      title: 'Are you sure to delete this product?',
      // text: 'Do you really want to perform this action?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {

        this.productService.deleteProduct(paylord).subscribe(
          (response) => {


          },
          (error) => {
            this.getAllProducts();
            Swal.fire('Success!', selectedProducts.productID + ' Product Delete Successfully!', 'success');
          }
        );
      }
    });



  }

  updatProduct() {
    console.log(this.productForm.value);


    this.productService.saveproduct(this.productForm.value).subscribe(
      (response) => {
        this.closePopup();
        this.getAllProducts();
        this.getCount();
        Swal.fire('Success!', response.productID + ' Product Updated Successfully!', 'success');
      },
      (error) => {
        console.error('Error product:', error);
      }
    );

  }

  downloadBarcode(productCode: string) {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, productCode, {
      format: 'CODE128',
      displayValue: true,
      height: 100,
      width: 2,
      fontSize: 16,
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${productCode}-barcode.png`;
    link.click();
  }
}
