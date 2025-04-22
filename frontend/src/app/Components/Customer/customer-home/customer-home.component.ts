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
import {usersService} from "../../../Services/users.service";
import {catchError, map, Observable, of} from "rxjs";


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
    'discount_rate',
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
  isLoyaltyCustomer: boolean = false;

  modalRef: any;
  grandTotal: any = 0;
  grandQty: number | undefined;
  userName: any;
  discount_rate: any;
  user_grade: any;

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
  @ViewChild('profile') profile: ElementRef | undefined;
  @ViewChild('SelectedSalePreview') SelectedSalePreview: ElementRef | undefined;

  constructor(private userSercice: usersService, private saleService: SaleService, private router: Router, private fb: FormBuilder, private productService: ProductService, private modal: NgbModal, private _Activatedroute: ActivatedRoute) {
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
    if (typeof window !== 'undefined' && localStorage) {
      const role = localStorage.getItem('role');
      if (role === 'Guest') {
        this.isGuest = true;
      } else if (role === 'Customer') {
        this.userName = localStorage.getItem('userName');


       this.getCustomerSales();
      }
    } else {
      console.warn('localStorage not available – probably running in SSR or build time');
    }
  }

  getCustomerSales(){
    this.sales = [];
    const paylord = {
      userId: localStorage.getItem('userID')
    };
    this.saleService.getCustomerSale(paylord).subscribe(
      (response) => {
        this.sales = response;
        this.dataSource = new MatTableDataSource(this.sales);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error product:', error);
      }
    );
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

  openProfileAccess() {
    this.modalRef = this.modal.open(this.profile, {centered: true});
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

      this.checkLoyaltyCustomer().subscribe((isLoyalty) => {
        this.isLoyaltyCustomer = isLoyalty;
        console.log('isLoyaltyCustomer::', isLoyalty);

        const finalAmount = (this.grandTotal * (100 - (this.discount_rate || 0))) / 100;

        let title = '';
        let html = '';

        if (isLoyalty) {
          title = '🎉 Congratulations!';
          html = `<p>You are a <strong>${this.user_grade.toUpperCase()}</strong> member of ours!</p>
        <p>You're entitled to a <strong>${this.discount_rate}% discount</strong>.</p>
        <p>Your final payment amount is: <strong>$ ${finalAmount}</strong></p>
        <br>
        <p><strong>How would you like to proceed with this sale?</strong></p>`;

        } else {
          title = '';
          html = `<p><strong>How would you like to proceed with this sale?</strong></p>`;
        }


        Swal.fire({
          title: title,
          html: html,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: '💳 Full Payment',
          cancelButtonText: '🛍️ Laybuy',
          allowOutsideClick: false,
          customClass: {
            title: 'swal2-title',
            htmlContainer: 'swal2-html-container',
            confirmButton: 'swal2-confirm',
            cancelButton: 'swal2-cancel'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const paylord = {
              userId: localStorage.getItem('userID'),
              totalAmount: this.grandTotal,
              qtyTot: this.grandQty,
              productsDto: this.cartProducts,
              finalAmount: this.isLoyaltyCustomer ? finalAmount : this.grandTotal,
              discount_rate: this.isLoyaltyCustomer ? this.discount_rate : 0,
              isFullPayment: true,
              status:1
            }
            console.log('Full payment!!!')
            this.handleFullPayment(paylord);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            console.log('LayBy payment!!!')
            this.handleLaybuyPayment(this.isLoyaltyCustomer ? finalAmount : this.grandTotal);
          }
        });
      });
    }
  }

  handleFullPayment(paylord) {
    this.saleService.addSale(paylord).subscribe(
      data => {
        Swal.fire({
          title: 'Order Placed Success!',
          html: '<span style="color: #30475e; font-weight: bold;">Click Ok to Download Sale QR Code</span>',
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
            this.reload();
            // Swal.fire(
            //   'Lay-By Confirmed!',
            //   `You will pay $${depositAmount} now and $${monthly} per month for 6 months.`,
            //   'success'
            // );
          }
        });
      },
      err => {
        Swal.fire('errr!', ' unuccessfully!', 'error');
      }
    );
  }

  handleLaybuyPayment(amountToPay) {

    Swal.fire({
      title: 'Lay-By Payment',
      html: `
        <p>You need to pay at least <strong>20%</strong> upfront to continue with Lay-By.</p>
        <p>Total Amount: <strong>$${amountToPay}</strong></p>
        <label>Enter your deposit percentage (min 20%):</label>
        <input type="number" id="depositInput" class="swal2-input" placeholder="e.g. 25" min="20" max="100">
        <div id="summary" style="margin-top:10px; text-align:left;"></div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const depositRate: any = (document.getElementById('depositInput') as HTMLInputElement)?.value;
        if (!depositRate || depositRate < 20 || depositRate > 100) {
          Swal.showValidationMessage('Please enter a valid percentage (min 20)');
          return false;
        }
        return Number(depositRate);
      },
      didOpen: () => {
        const input = document.getElementById('depositInput') as HTMLInputElement;
        const summaryDiv = document.getElementById('summary') as HTMLDivElement;

        input.addEventListener('input', () => {
          const val = parseFloat(input.value);
          if (val >= 20 && val <= 100) {
            const depositAmount = (amountToPay * val / 100).toFixed(2);
            const restAmount = (amountToPay - Number(depositAmount)).toFixed(2);
            const monthly = (Number(restAmount) / 6).toFixed(2);
            summaryDiv.innerHTML = `
              <p><strong>Initial Payment:</strong> $${depositAmount}</p>
              <p><strong>Remaining Amount:</strong> $${restAmount}</p>
              <p><strong>Monthly Payment (for 6 months):</strong> $${monthly}</p>
            `;
          } else {
            summaryDiv.innerHTML = '';
          }
        });
      },
      showCancelButton: true,
      confirmButtonText: 'Continue',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        const depositRate = result.value;
        const depositAmount = (amountToPay * depositRate / 100).toFixed(2);
        const restAmount = (amountToPay - Number(depositAmount)).toFixed(2);
        const monthly = (Number(restAmount) / 6).toFixed(2);

        const paylord = {
          userId: localStorage.getItem('userID'),
          totalAmount: this.grandTotal,
          qtyTot: this.grandQty,
          productsDto: this.cartProducts,
          finalAmount: amountToPay,
          discount_rate: this.isLoyaltyCustomer ? this.discount_rate : 0,
          isFullPayment: false,
          depositAmount: depositAmount,
          mounthly_payment: monthly,
          depositRate: depositRate,
          status:0
        }

        this.handleFullPayment(paylord);
      }
    });
  }

  checkLoyaltyCustomer(): Observable<boolean> {
    return this.userSercice.getByUserId().pipe(
      map(data => {
        if (data.discount_rate !== 0 && data.user_grade !== null) {
          this.discount_rate = data.discount_rate;
          this.user_grade = data.user_grade;
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Error checking loyalty:', error);
        return of(false);
      })
    );
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

    console.log(data)
    console.log(data.saleItemsDtos)
    this.modalRef = this.modal.open(this.SelectedSalePreview, {centered: true});
  }

  getGradeClass(grade: string | null): string {
    switch (grade?.toLowerCase()) {
      case 'gold':
        return 'grade-gold';
      case 'silver':
        return 'grade-silver';
      case 'platinum':
        return 'grade-platinum';
      default:
        return 'grade-default';
    }
  }

  calculateEndDate(startDate: string, months: number): string {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + months);
    return date.toISOString().split('T')[0];
  }

  mounthlyPayment(){
    console.log(this.selectedSale);

    this.saleService.mounthlyPayment(this.selectedSale.saleId).subscribe(
      data => {
        this.getCustomerSales();
        this.closeProductPreviewPopup();
        // this.salePreview(this.selectedSale);
        Swal.fire('', 'Monthly fee settled', 'success');
      },error => {

      }
    )
  }

  protected readonly localStorage = localStorage;
}
