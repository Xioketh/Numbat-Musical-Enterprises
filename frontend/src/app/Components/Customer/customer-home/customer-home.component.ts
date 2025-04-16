import {HttpClient} from '@angular/common/http';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import QRCode from 'qrcode';
import {SaleService} from "../../../Services/sale.service";
import {ProductService} from "../../../Services/product.service";


interface Category {
  value: string;
  viewValue: string;
}

interface productModel {
  productName: string;
  category: string;
  createDate: string;
  description: string;
  image1: string;
  image2: string;
  image3: string;
  productID: string;
  price: number;
  qty: string;
  initialQty: number;
  itemizedTotalAmount: number;
  status: number;
}

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})

export class CustomerHomeComponent {
  displayedColumns: string[] = [
    'orderId',
    'qtyTot',
    'totalAmount',
    'soldDate',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;

  isCartProductsPresent: boolean = false;
  loading: boolean = false;

  products: productModel[] = [
    {
      productName: '',
      category: '',
      createDate: '',
      description: '',
      image1: '',
      image2: '',
      image3: '',
      productID: '',
      price: 0,
      qty: '',
      initialQty: 0,
      itemizedTotalAmount: 0,
      status: 0,
    }
  ];
  cartProducts: productModel[] = [];
  sales: any = [];
  filteredProducts: any = [];
  selectedProduct: any = [];
  selectedSale: any = [];
  isGuest: boolean = false;

  modalRef: any;
  grandTotal: any = 0;
  grandQty: number | undefined;
  userName: any;

  categories: Category[] = [
    {value: '', viewValue: 'All'},
    {value: 'Guitars and Accessories', viewValue: 'Guitars and Accessories'},
    {value: 'Amplifiers and Effects', viewValue: 'Amplifiers and Effects'},
    {value: 'Keyboards and Digital Pianos', viewValue: 'Keyboards and Digital Pianos'},
    {value: 'Drums and Percussion', viewValue: 'Drums and Percussion'},
    {value: 'Pro Audio Equipment', viewValue: 'Pro Audio Equipment'},
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('cart') cart: ElementRef | undefined;
  @ViewChild('viewProduct') viewProduct: ElementRef | undefined;
  @ViewChild('sale') sale: ElementRef | undefined;
  @ViewChild('SelectedSalePreview') SelectedSalePreview: ElementRef | undefined;
  constructor(private saleService: SaleService, private router: Router, private fb: FormBuilder, private productService: ProductService, private modal: NgbModal, private _Activatedroute: ActivatedRoute) {
    this.getAllProducts();
    this.checkRole();

    const rawData = this._Activatedroute.snapshot.queryParamMap.get('my_object');

    if (rawData) {
      this.isCartProductsPresent = true;
    } else {
    }
    this.cartProducts = [];
  }

  checkRole() {
    const role = localStorage.getItem('role');
    if (role === 'Guest') {
      this.isGuest = true;
    }

    if (role == 'Customer') {
      this.userName = localStorage.getItem('userName');
      const paylord = {
        userId: localStorage.getItem('userID')
      }
      this.saleService.getCustomerSale(paylord).subscribe(
        (response) => {
          this.sales = response

          this.dataSource = new MatTableDataSource(this.sales);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          console.error('Error product:', error);
        }
      );
    }
  }

  getAllProducts() {
    this.productService.getActiveProducts().subscribe(
      (response) => {
        this.products = response
      },
      (error) => {
        console.error('Error product:', error);
      }
    );

  }

  addToCart(product: any) {
    this.cartProducts.push(product)
  }

  openCartAccess(event: any) {
    this.updateGrandTotal();
    this.modalRef = this.modal.open(this.cart, {centered: true});
  }

  openSalesAccess() {
    this.modalRef = this.modal.open(this.sale, {centered: true});
  }

  closePopup() {
    this.modalRef.close();
  }

  closeProductPreviewPopup() {
    this.modalRef.close();
    this.openSalesAccess();
  }

  qtyChange(event: any, i: number) {
    this.cartProducts[i].qty = event.target.value
  }

  onCategorySelectionChange(event: any): void {
    this.filteredProducts = [];
    const selectedCategoryValue = event.value;
    this.filteredProducts = this.products.filter(product =>
      product.category.toLowerCase().includes(selectedCategoryValue.toLowerCase())
    );
  }

  onSearchTerm(event: any): void {
    this.filteredProducts = [];
    const selectedCategoryValue = event.value;
    this.filteredProducts = this.products.filter(product =>
      product.productName.toLowerCase().includes(selectedCategoryValue.toLowerCase())
    );
  }

  changeQtyUpdateTotal(event: any, i: number) {
    if (event.target.value <= 0 || event.target.value > this.cartProducts[i].qty) {
      Swal.fire('', 'Add Valid Stock', 'warning');
      event.target.value = this.cartProducts[i].initialQty;
      return;
    }
    if (this.cartProducts[i].initialQty) {
      this.cartProducts[i].initialQty = parseInt(event.target.value);
      this.cartProducts[i].itemizedTotalAmount = this.cartProducts[i].initialQty * this.cartProducts[i].price
    } else {
      this.cartProducts[i].initialQty = parseInt(event.target.value);
      this.cartProducts[i].itemizedTotalAmount = this.cartProducts[i].initialQty * this.cartProducts[i].price
    }
    this.updateGrandTotal();
  }

  deletCartItem(i: any) {
    this.cartProducts.splice(i, 1);
    this.updateGrandTotal();
  }

  placeOrder() {
    let role = localStorage.getItem('role')

    if (this.cartProducts.length == 0) {
      this.closePopup();
      Swal.fire('', 'Please Add Items to Cart!', 'error');
      return;
    }

    if (role == 'Guest') {
      Swal.fire({
        title: 'Please Login to continue',
        text: 'You Are in Guest Account',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.closePopup();
          const url = 'login';
          this.router.navigate(['/login'], {queryParams: {my_object: JSON.stringify(this.cartProducts)}});
          // this.router.navigate([url], {
          //   state: {
          //     cartProducts: this.cartProducts
          //   }
          // });
        } else {
          return;
        }
      });
    } else {
      this.grandQty = 0;
      for (let i = 0; i < this.cartProducts.length; i++) {
        if (this.cartProducts[i].initialQty) {
          this.grandQty += this.cartProducts[i].initialQty;
        } else {
          Swal.fire('', 'Please Check Cart Items Quantity!', 'warning');
          return;
        }
      }

      const paylord = {
        userId: localStorage.getItem('userID'),
        totalAmount: this.grandTotal,
        qtyTot: this.grandQty,
        productsDto: this.cartProducts
      }

      this.saleService.addSale(paylord).subscribe(
        data => {
          Swal.fire({
            title: 'Order Placed Success!',
            html: '<span style="color: #F28123; font-weight: bold;">You will receive a confirmation Email & Downloading Sale QR Code</span>',
            icon: 'success',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.closePopup();
              this.loading = true;
              // qr
              const qrValue = data.saleId;
              const canvas = document.createElement('canvas');

              QRCode.toCanvas(canvas, qrValue, {errorCorrectionLevel: 'H'}, (error) => {
                if (error) {
                  console.error('Error generating QR code:', error);
                } else {
                  this.downloadQRImage(canvas, qrValue);
                }
              });
              // qr end
              this.sendMail(data);
            }
          });
        },
        err => {
          Swal.fire('errr!', ' unuccessfully!', 'error');
        }
      );
    }
  }

  downloadQRImage(canvas: HTMLCanvasElement, qrValue) {
    const dataUrl = canvas.toDataURL();

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'QRCode_' + qrValue + '.png';
    link.click();
  }

  updateGrandTotal() {
    this.grandTotal = 0;
    for (let i = 0; i < this.cartProducts.length; i++) {
      // this.grandTotal += this.cartProducts[i].qty * this.cartProducts[i].price;
      if (this.cartProducts[i].itemizedTotalAmount) {
        this.grandTotal += this.cartProducts[i].itemizedTotalAmount;
      }
    }
  }

  openViewProduct(event: any) {
    this.selectedProduct = [];
    this.selectedProduct = event
    this.modalRef = this.modal.open(this.viewProduct, {centered: true});
  }


  sendMail(data: any) {
    const or = {
      saleId: data.saleId,
      sendMail: localStorage.getItem('email')
    }

    this.saleService.sendMail(or).subscribe(
      data => {
        this.reload();
        this.loading = false;
        Swal.fire(
          '',
          'Order Placed!',
          'success'
        )
      },
      error => {
        this.loading = false;
        Swal.fire(
          '',
          'Mail Send Error!',
          'error'
        )
      }
    );
  }

  reload() {
    this.selectedProduct = [];
    this.cartProducts = [];
    this.getAllProducts();
    this.checkRole();
  }

  salePreview(data: any) {
    this.selectedSale = [];
    this.closePopup();
    this.selectedSale = data

    console.log(data.saleItemsDtos)
    this.modalRef = this.modal.open(this.SelectedSalePreview, {centered: true});
  }
}
