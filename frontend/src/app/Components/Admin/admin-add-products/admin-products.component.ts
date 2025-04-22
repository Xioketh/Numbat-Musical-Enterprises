import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {ProductService} from "../../../Services/product.service";
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent {

  productNameValidate: boolean = false;
  categoryValidate: boolean = false;
  qtyValidate: boolean = false;
  descriptionValidate: boolean = false;
  priceValidate: boolean = false;

  mainImageValidate:boolean=false;
  mainImageValidate2:boolean=false;
  mainImageValidate3:boolean=false;

  enableLoader:boolean=false;

  productData: any = {
    productName: '',
    category: '',
    qty: '',
    description: '',
    price: '',
  }


  // *************
  // img1
  image1: File | null = null;
  imageMin1: File | null = null;
  showImg1: boolean = false

  // img2
  image2: File | null = null;
  imageMin2: File | null = null;
  showImg2: boolean = false

  // img3
  image3: File | null = null;
  imageMin3: File | null = null;
  showImg3: boolean = false

  constructor(private fb: FormBuilder, private productService: ProductService, private httpClient: HttpClient, private router:Router) { }

  validateForm() {
    console.log(this.productData)
    this.mainImageValidate=false
    this.mainImageValidate2=false
    this.mainImageValidate3=false


    this.productNameValidate = this.productData.productName.trim() === '';
    this.categoryValidate = this.productData.category.trim() === '';
    this.qtyValidate = this.productData.qty === '' || isNaN(this.productData.qty) || this.productData.qty <= 0;
    this.descriptionValidate = this.productData.description.trim() === '';
    this.priceValidate = this.productData.price === ''|| isNaN(this.productData.price) || this.productData.price <0;

    if(this.image1===null){
      this.mainImageValidate=true;
    }

    if(this.image2===null){
      this.mainImageValidate2=true
    }

    if(this.image3===null){
      this.mainImageValidate3=true
    }


    return (
      this.productNameValidate ||
      this.categoryValidate ||
      this.qtyValidate ||
      this.descriptionValidate ||
      this.priceValidate ||
      this.mainImageValidate ||
      this.mainImageValidate2 ||
      this.mainImageValidate3
    );

  }


  public onFileChanged(event, x: number) {switch (x) {
      case 1:
        this.image1 = event.target.files[0];
        this.imageMin1 = null;
        const fr = new FileReader();
        fr.onload = (evento: any) => {
          this.imageMin1 = evento.target.result;
        };
        if (this.image1) {
          fr.readAsDataURL(this.image1);
        }
        this.showImg1 = true;
        break;

      case 2:
        this.image2 = event.target.files[0];
        this.imageMin2 = null;
        const fr2 = new FileReader();
        fr2.onload = (evento: any) => {
          this.imageMin2 = evento.target.result;
        };
        if (this.image2) {
          fr2.readAsDataURL(this.image2);
        }
        this.showImg2 = true;
        break;

      case 3:
        this.image3 = event.target.files[0];
        this.imageMin3 = null;
        const fr3 = new FileReader();
        fr3.onload = (evento: any) => {
          this.imageMin3 = evento.target.result;
        };
        if (this.image3) {
          fr3.readAsDataURL(this.image3);
        }
        this.showImg3 = true;
        break;
      default:
        console.log('default!')

    }

  }

  submitOtherData(data: any) {
    this.productData.productID = data.productID;

    this.productService.saveproduct(this.productData).subscribe(
      (response) => {
        this.enableLoader = false;
        this.clearForm();

        Swal.fire({
          title: `${data.productID} Product Saved Successfully!`,
          text: 'Click OK to download the barcode.',
          icon: 'success',
          confirmButtonText: 'Ok',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.downloadBarcode(data.productID);
            this.router.navigateByUrl('/admin/product-list');
          }
        });
      },
      (error) => {
        this.enableLoader = false;
        this.clearForm();
        Swal.fire('Error!', 'Product Save Unsuccessful', 'error');
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

  onSubmit(): void {
    if (this.validateForm()) {
      return;
    }
    this.enableLoader=true;
    const paylord = {
      image1: this.image1,
      image2: this.image2,
      image3: this.image3
    }
    if (paylord) {
      this.productService.upload(paylord).subscribe(
        data => {
          this.submitOtherData(data)

        },
        err => {
          this.enableLoader=false;
          Swal.fire('Oops!', ' Product Save unsuccessful!\n Try Different Image Sizes.', 'error');
        }
      );
    }
  }

  clearForm() {
    this.productData = {
      productName: '',
      category: '',
      qty: '',
      description: '',
      price: '',
    }
    this.showImg1 = false;
    this.showImg2 = false;
    this.showImg3 = false;

    this.image1=null;
    this.image2=null;
    this.image3=null;
  }

}

