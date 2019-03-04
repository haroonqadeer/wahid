import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-try-menu-page',
  templateUrl: './try-menu-page.component.html',
  styleUrls: ['./try-menu-page.component.scss']
})
export class TryMenuPageComponent implements OnInit {

  //Page Combo Box Model
  userSelected = '';

  show = '';

  public menus: any;

  userRolesList = [
    {
      userId: 1,
      username: 'zeeshan',
      password: 'abc123',
      designation: 'Admin'
    },
    {
      userId: 2,
      username: 'zohaib',
      password: 'abc123',
      designation: 'HR Manager'
    },
    {
      userId: 3,
      username: 'shahrukh',
      password: 'abc123',
      designation: 'Finance Manager'
    }
  ]

  menus1 = [
    {
      menuId: 1,
      menuName: 'UMIS Dashboard',
      moduleName: 'User Management',
      userId: 1

    },
    {
      menuId: 2,
      menuName: 'User Profile',
      moduleName: 'User Management',
      userId: 1
    },
    {
      menuId: 3,
      menuName: 'User Role',
      moduleName: 'User Management',
      userId: 1
    }
  ]

  menus2 = [
    {
      menuId: 1,
      menuName: 'HR Dashboard',
      moduleName: 'HR Management',
      userId: 2
    },
    {
      menuId: 2,
      menuName: 'Employee Profile',
      moduleName: 'HR Management',
      userId: 2
    },
    {
      menuId: 3,
      menuName: 'Job Profile',
      moduleName: 'HR Management',
      userId: 2
    }
  ]

  menus3 = [
    {
      menuId: 1,
      menuName: 'Job Profile',
      moduleName: 'HR Management',
      userId: 3
    },
    {
      menuId: 2,
      menuName: 'Finance Dashboard',
      moduleName: 'Finance Management',
      userId: 3
    },
    {
      menuId: 3,
      menuName: ' Bank Account',
      moduleName: 'Finance Management',
      userId: 3
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  getUserSelect(value) {
    //alert(value);
    if (value == 1) {
      this.menus = this.menus1;
    }
    else if (value == 2) {
      this.menus = this.menus2;
    }
    else if (value == 3) {
      this.menus = this.menus3;
    }
  }
}
