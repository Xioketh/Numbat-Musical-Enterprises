import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import Swal from "sweetalert2";
import {faArrowRightFromBracket, faBox, faCartPlus, faUser} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})


export class CustomerHeaderComponent {

  faBox = faBox;
  faCartPlus = faCartPlus;
  faUser = faUser;
  faArrowRightFromBracket = faArrowRightFromBracket;

  isSticky: boolean = false;
  openCart: boolean = false;
  openSales: boolean = false;
  openProfileView: boolean = false;
  showMyOrders: boolean = false;

  userRole: any;

  @Input() cartProdcuts: any[] = [];
  @Input() sales: any[] = [];

  @Output() openCartAccess = new EventEmitter<any>();
  @Output() openSalesAccess = new EventEmitter<any>();
  @Output() openProfileAccess = new EventEmitter<any>();

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollTop = window.pageYOffset;
    this.isSticky = scrollTop > 0;

    const header = document.getElementById('sticker');
    if (header) {
      const transparency = scrollTop / header.clientHeight;
      header.style.backgroundColor = `rgba(255, 255, 255, ${1 - transparency})`;
    }
  }

  constructor() {
    if (typeof window !== 'undefined' && localStorage) {
      const roleString = localStorage.getItem('role');
      this.userRole = roleString !== null ? roleString : null;
      if (this.userRole == "Customer") {
        this.showMyOrders = true;
      } else {
        localStorage.setItem('role', "Guest")
      }
    }

  }

  cartView() {
    console.log(this.cartProdcuts)
    this.openCart = true;
    this.openCartAccess.emit(this.openCart)
  }

  salesView() {
    this.openSales = true;
    this.openSalesAccess.emit(this.openSales)
  }

  onProfileView(){
    this.openProfileView = true;
    this.openProfileAccess.emit(this.openProfileView)
  }

  onLog() {
    if (this.userRole == "Customer") {
      Swal.fire({
        title: 'Are you sure to logout ?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login';
        }
      });
    } else {
      window.location.href = '/login';
    }
  }
}
