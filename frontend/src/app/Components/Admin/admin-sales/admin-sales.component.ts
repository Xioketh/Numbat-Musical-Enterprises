import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {SaleService} from "../../../Services/sale.service";
import {DashbordService} from "../../../Services/dashbord.service";


// const htmlToPdfmake = import('html-to-pdfmake');
// pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-admin-sales',
  templateUrl: './admin-sales.component.html',
  styleUrl: './admin-sales.component.css'
})
export class AdminSalesComponent {
  displayedColumns: string[] = [
    'saleId',
    'qtyTot',
    'soldDate',
    'totalAmount',
    'userId'
  ];

  dataSource!: MatTableDataSource<any>;

  countObj: any = [];
  sales: any = [];
  reportData: any = [];

  modalRef: any;
  startDate: string | undefined;
  endDate: string | undefined;

  @ViewChild('reportGenrate') reportGenrate: ElementRef | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('content', { static: false }) el!: ElementRef;
  @ViewChild('pdftable') pdftable!: ElementRef;

  constructor(private fb: FormBuilder, private saleService: SaleService, private dashBoardService: DashbordService, private modal: NgbModal) {
    this.getAllSales();
  }

  getAllSales() {
    this.saleService.getAllSales().subscribe(
      (response) => {
        this.sales = response;
        this.getCount();
        this.dataSource = new MatTableDataSource(this.sales);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error product:', error);
      }
    );
  }

  getCount() {
    this.dashBoardService.getCount().subscribe(
      (response) => {
        this.countObj = response;
        console.log(this.countObj);
      },
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reportView() {
    this.modalRef = this.modal.open(this.reportGenrate, { centered: true });
  }


  download() {
    if (this.startDate === undefined || this.endDate === undefined || this.startDate > this.endDate) {
      Swal.fire({
        title: 'Please Select Valid Date Range',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
      })
      return;
    }

    this.saleService.getReportData(this.startDate, this.endDate).subscribe(
      (response) => {
        this.reportData = response;
        this.downloadReport();
      }
    );

  }

  downloadReport() {
    Swal.fire({
      title: 'Download Sales Report PDF ?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.exportPDF();
      }
    });
  }

  async exportPDF() {
    // import('html-to-pdfmake').then(htmlToPdfmakeModule => {
    //   const htmlToPdfmake = htmlToPdfmakeModule.default;
    //   const pdftable = this.pdftable.nativeElement;
    //   const html = htmlToPdfmake(pdftable.innerHTML);
    //   pdfMake.vfs = pdfFonts.pdfMake.vfs;
    //   const documentDefinition = { content: html };
    //
    //   // Create the PDF
    //   const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    //
    //   // Generate the Blob containing the PDF data
    //   pdfDocGenerator.getBlob((blob) => {
    //     // Create a download link
    //     const a = document.createElement('a');
    //     a.href = URL.createObjectURL(blob);
    //
    //     // Specify the desired filename
    //     a.download = this.startDate+' to '+this.startDate+'_Sales Report.pdf';
    //
    //     // Append the link to the DOM and trigger the download
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    //   });
    // });
  }


}
