import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {usersService} from "../../../Services/users.service";
import {DashbordService} from "../../../Services/dashbord.service";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  displayedColumns: string[] = [
    'user_id',
    'user_name',
    'adress',
    'email',
    'tel'
  ];
  usersList:any=[];
  countObj:any=[];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private userService: usersService, private dashBoardService: DashbordService){
    this.getAllUsers()
  }


  getAllUsers(){
    this.userService.getAllUsers().subscribe(
      (Response)=>{
        this.getCount()
        this.usersList=Response
        this.dataSource = new MatTableDataSource(this.usersList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCount(){
    this.dashBoardService.getCount().subscribe(
      (response) => {
        console.log(response);

        this.countObj=response;
      },
    );
  }
}


