import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { TreeNode } from '../../nodeTree/TreeNode';
import { NodeService } from '../../nodeTree/node.service';

import { OrderPipe } from 'ngx-order-pipe';
import { HttpClient } from '@angular/common/http';


//----------------------------------------------------------------------------//
//-------------------Working of this typescript file are as follows-----------//
//-------------------Getting role data into main table------------------------// 
//-------------------Getting modules and menu data in menuTree----------------//
//-------------------Getting specific role data in drop down box--------------//
//-------------------Getting specific module data in table--------------------//
//-------------------Add menuTree data into roleTree--------------------------// 
//-------------------Remove roleTree data-------------------------------------// 
//-------------------Creation of roles, modules and menu in database----------//
//-------------------Update roles, modules and menu into database-------------//
//-------------------Delete roles, modules and menu into database-------------//
//-------------------Add permissions of roles---------------------------------//
//-------------------Save permissions into database---------------------------//


//For Push Data in the Object array
export interface erpObject {
  erpObjctCd: string;
  erpObjctTypeCd: string;
}

@Component({
  selector: 'app-userroles',
  templateUrl: './userroles.component.html',
  styleUrls: ['./userroles.component.scss']
})
export class UserrolesComponent implements OnInit {

  order: string = "uId";
  reverse: boolean = false;
  //selectedEntry = "5";

  //Page Models
  erpRoleCd = '';
  txtdPassword = '';
  txtdPin = '';
  erpRoleName = '';
  cmbModule = '';
  roleSearch = '';

  //list for tree
  menuTree: TreeNode[];

  selectedMenu: TreeNode[];

  roleTree: TreeNode[];

  selectedRole: TreeNode[];



  serverUrl = "https://localhost:5001/";

  constructor(private http: HttpClient, public toastr: ToastrManager, private nodeService: NodeService) { }

  //list variables
  public employees = [];
  public tempRoleList = [];
  public modules;
  public menus;
  public roles;
  public menuList = [];
  public children = [];
  public roleList = [];
  public roleChildren = [];
  public erpObjct: Array<erpObject> = [];

  ngOnInit() {

    this.getMenu();
    this.getRole();
  }

  //setting ascending or descending order of table
  setOrder(value: any) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  //Adding modules and menu in role tree 
  addRoles() {

    var itemFound = false;
    var itemIndex = 0;
    this.roleChildren = [];

    //checking if menuTree data not selected
    if (this.selectedMenu == undefined) {
      this.toastr.errorToastr('Please Select Nodes!', 'Error', { toastTimeout: (2500) }); return;
    }

    //if module is selected
    if (this.selectedMenu[0].data[0].typeCode == 1) {
      //if role tree is empty
      if (this.roleTree == undefined) {

        for (var i = 0; i < this.selectedMenu[0].children.length; i++) {
          //checking if children (menu) exists and children (menu) parent id and object parent id are same 
          //then push children (menu) in role tree children 
          if (this.selectedMenu[0].children[i].data[0].typeCode == 2
            && this.selectedMenu[0].children[i].data[0].parentErpObjCd == this.selectedMenu[0].data[0].objCode) {

            this.roleChildren.push({
              label: this.selectedMenu[0].children[i].data[0].objName,
              data: [{
                objName: this.selectedMenu[0].children[i].data[0].objName,
                typeCode: this.selectedMenu[0].children[i].data[0].typeCode,
                objCode: this.selectedMenu[0].children[i].data[0].objCode,
                parentErpoObjCd: this.selectedMenu[0].data[0].objCode
              }]
            });
          }
        }

        this.roleList.push({
          label: this.selectedMenu[0].data[0].objName,
          data: [{
            objName: this.selectedMenu[0].data[0].objName,
            typeCode: this.selectedMenu[0].data[0].typeCode,
            objCode: this.selectedMenu[0].data[0].objCode
          }],
          children: this.roleChildren
        });

      } else {

        for (var i = 0; i < this.roleTree.length; i++) {
          //checking if role tree object code is equal to selected menu object code
          if (this.roleTree[i].data[0].objCode == this.selectedMenu[0].data[0].objCode) {

            itemFound = true;
            itemIndex = i;
            i = this.roleTree.length + 1;

          } else {
            itemFound = false;
            itemIndex = 0;
          }
        }

        if (itemFound == true) {

          //checking if selected menu children length is equal to role tree children length  
          if (this.selectedMenu[0].children.length == this.roleTree[itemIndex].children.length) {
            this.toastr.errorToastr('Already Add ' + this.selectedMenu[0].data[0].objName + ' Menu!', 'Error', { toastTimeout: (2500) });
            itemFound = false;
            itemIndex = 0; return
          } else {

            for (var i = 0; i < this.selectedMenu[0].children.length; i++) {
              itemFound = false;
              for (var j = 0; j < this.roleTree[itemIndex].children.length; j++) {
                //checking if selected menu children id and role tree children id are same
                if (this.selectedMenu[0].children[i].data[0].objCode == this.roleTree[itemIndex].children[j].data[0].objCode) {
                  itemFound = true;
                  j = this.roleTree[itemIndex].children.length + 1;
                }
              }

              //if condtion true then push data in childrens
              if (itemFound != true) {
                this.roleChildren.push({
                  label: this.selectedMenu[0].children[i].data[0].objName,
                  data: [{
                    objName: this.selectedMenu[0].children[i].data[0].objName,
                    typeCode: this.selectedMenu[0].children[i].data[0].typeCode,
                    objCode: this.selectedMenu[0].children[i].data[0].objCode,
                    parentErpoObjCd: this.selectedMenu[0].data[0].objCode
                  }]
                });
                this.roleList[itemIndex].children.push(this.roleChildren[0]);
                this.roleChildren = [];
              }

            }

          }
        } else {
          this.roleChildren = [];

          for (var i = 0; i < this.selectedMenu[0].children.length; i++) {
            //checking if selectedMenu type is menu and 
            //selectedMenu children parent id and selectedMenu id are same then push data in role tree children
            if (this.selectedMenu[0].children[i].data[0].typeCode == 2
              && this.selectedMenu[0].children[i].data[0].parentErpObjCd == this.selectedMenu[0].data[0].objCode) {

              this.roleChildren.push({
                label: this.selectedMenu[0].children[i].data[0].objName,
                data: [{
                  objName: this.selectedMenu[0].children[i].data[0].objName,
                  typeCode: this.selectedMenu[0].children[i].data[0].typeCode,
                  objCode: this.selectedMenu[0].children[i].data[0].objCode,
                  parentErpoObjCd: this.selectedMenu[0].data[0].objCode
                }]
              });
            }
          }

          this.roleList.push({
            label: this.selectedMenu[0].data[0].objName,
            data: [{
              objName: this.selectedMenu[0].data[0].objName,
              typeCode: this.selectedMenu[0].data[0].typeCode,
              objCode: this.selectedMenu[0].data[0].objCode
            }],
            children: this.roleChildren
          });

        }
      }
    } else if (this.selectedMenu[0].data[0].typeCode == 2) {

      //checking if role tree doesnot have any value
      if (this.roleTree == undefined) {
        this.roleChildren.push({
          label: this.selectedMenu[0].data[0].objName,
          data: [{
            objName: this.selectedMenu[0].data[0].objName,
            typeCode: this.selectedMenu[0].data[0].typeCode,
            objCode: this.selectedMenu[0].data[0].objCode
          }]
        });

        this.roleList.push({
          label: this.selectedMenu[0].data[0].parentErpObjName,
          data: [{
            objName: this.selectedMenu[0].data[0].parentErpObjName,
            typeCode: this.selectedMenu[0].data[0].parentErpObjTypeCd,
            objCode: this.selectedMenu[0].data[0].parentErpObjCd
          }],
          children: this.roleChildren
        });
      } else {

        itemFound = false;
        itemIndex = 0;

        for (var i = 0; i < this.roleTree.length; i++) {
          //checking if selectedMenu parent id and roletree id are same
          if (this.selectedMenu[0].data[0].parentErpObjCd == this.roleTree[i].data[0].objCode) {
            itemFound = true;
            itemIndex = i;
            i = this.roleTree.length + 1;
          }
        }
        if (itemFound == true) {

          itemFound = false;
          for (var i = 0; i < this.roleTree[itemIndex].children.length; i++) {
            //checking if selectedMenu id and roletree children id are same
            if (this.selectedMenu[0].data[0].objCode == this.roleTree[itemIndex].children[i].data[0].objCode) {
              itemFound = true;
              i = this.roleTree[itemIndex].children.length + 1;
            } else {
              itemFound = false;
            }
          }

          if (itemFound == true) {
            this.toastr.errorToastr('Already Add ' + this.selectedMenu[0].data[0].objName + 'Menu!', 'Error', { toastTimeout: (2500) });
          } else {
            this.roleChildren.push({
              label: this.selectedMenu[0].data[0].objName,
              data: [{
                objName: this.selectedMenu[0].data[0].objName,
                typeCode: this.selectedMenu[0].data[0].typeCode,
                objCode: this.selectedMenu[0].data[0].objCode
              }]
            });
            //alert(this.roleChildren[0].data[0].objName);
            this.roleList[itemIndex].children.push(this.roleChildren[0]);
          }

        } else {
          this.roleChildren = [];
          this.roleChildren.push({
            label: this.selectedMenu[0].data[0].objName,
            data: [{
              objName: this.selectedMenu[0].data[0].objName,
              typeCode: this.selectedMenu[0].data[0].typeCode,
              objCode: this.selectedMenu[0].data[0].objCode
            }]
          });

          this.roleList.push({
            label: this.selectedMenu[0].data[0].parentErpObjName,
            data: [{
              objName: this.selectedMenu[0].data[0].parentErpObjName,
              typeCode: this.selectedMenu[0].data[0].parentErpObjTypeCd,
              objCode: this.selectedMenu[0].data[0].parentErpObjCd
            }],
            children: this.roleChildren
          });
        }

      }
    }

    this.roleTree = this.roleList;
  }

  //removing selected menu or module from role tree
  removeRoles() {

    //checking if roleTree data not selected
    if (this.selectedRole == undefined) {
      this.toastr.errorToastr('Please Select Nodes to Remove!', 'Error', { toastTimeout: (2500) }); return;
    }

    //checking if selectedRole type is Module then apply follow condition
    if (this.selectedRole[0].data[0].typeCode == 1) {
      //getting index of selectedRole in roleTree
      var index = this.roleTree.indexOf(this.selectedRole[0]);

      //removing entire row including with children from roleTree
      this.roleTree.splice(index, 1);
    } else if (this.selectedRole[0].data[0].typeCode == 2) {

      for (var i = 0; i < this.roleTree.length; i++) {

        for (var j = 0; j < this.roleTree[i].children.length; j++) {
          //checking if roleTree children id and selectedRole id are same 
          if (this.roleTree[i].children[j].data[0].objCode == this.selectedRole[0].data[0].objCode) {
            //checking if roleTree children length is 1 
            if (this.roleTree[i].children.length == 1) {
              //getting index of selectedRole and remove parent and children of selectedRole
              var index = this.roleTree.indexOf(this.selectedRole[0]);
              this.roleTree.splice(index, 1); return
            } else {
              //getting index of  selected children and remove the current index 
              var index = this.roleTree[i].children.indexOf(this.selectedRole[0]);
              this.roleTree[i].children.splice(index, 1);
            }

          }

        }

      }

    }

  }

  //Assign id and name to hidden labels
  delete(item) {
    this.clear();

    this.erpRoleName = item.erpRoleName;
    this.erpRoleCd = item.erpRoleCd;
  }

  //delete user role data from database
  deleteRole() {

    //checking if password is empty
    if (this.txtdPassword.trim().length == 0) {

      this.toastr.errorToastr('Please Enter Password', 'Oops!', { toastTimeout: (2500) });
      return;
    } else if (this.txtdPin.trim().length == 0) {

      this.toastr.errorToastr('Please Enter Pin', 'Oops!', { toastTimeout: (2500) });
      return;
    }

    //deleting roles from database 
    this.http.delete(this.serverUrl + 'api/deleteUserRole' + this.erpRoleCd).subscribe((data: any) => {

      this.toastr.successToastr(data, 'Success', { toastTimeout: (2500) }); return;
    });
  }

  //save role data in database
  save() {

    //checking if role name is empty
    if (this.erpRoleName.trim().length == 0) {

      this.toastr.errorToastr('Please Enter Role Name', 'Oops!', { toastTimeout: (2500) });
      return;
    } else if (this.roleTree == undefined) {
      this.toastr.errorToastr('Please Push Data in Role Tree', 'Error', { toastTimeout: (2500) }); return
    }

    //Adding role tree data to another list
    for (var i = 0; i < this.roleTree.length; i++) {

      this.erpObjct.push({
        erpObjctCd: this.roleTree[i].data[0].objCode,
        erpObjctTypeCd: this.roleTree[i].data[0].typeCode
      });
      for (var j = 0; j < this.roleTree[i].children.length; j++)

        this.erpObjct.push({
          erpObjctCd: this.roleTree[i].children[j].data[0].objCode,
          erpObjctTypeCd: this.roleTree[i].children[j].data[0].typeCode
        });
    }

    if (this.erpRoleCd == "") {
      //Save roles in database

      var roleData = { erpObjct: JSON.stringify(this.erpObjct), erpRoleName: this.erpRoleName };
      this.http.post(this.serverUrl + 'api/saveUserRole', roleData).subscribe((data: any) => {

        this.toastr.successToastr(data, 'Success', { toastTimeout: (2500) }); return;
      });
    } else {
      //Update roles in database

      var rolesData = { erpObjct: JSON.stringify(this.erpObjct), erpRoleCd: this.erpRoleCd, erpRoleName: this.erpRoleName };
      this.http.put(this.serverUrl + 'api/updateUserRole', rolesData).subscribe((data: any) => {

        this.toastr.successToastr(data, 'Success', { toastTimeout: (2500) }); return;
      });
    }

  }

  //save each role permissions in database
  savePermission() {

    for (var i = 0; i < this.tempRoleList.length; i++) {
      if (this.tempRoleList[i].Addition == undefined)
        this.tempRoleList[i].Addition = false;
    }

    var rolesData = { tempRoleList: JSON.stringify(this.tempRoleList), erpRoleCd: this.erpRoleCd };
    this.http.put(this.serverUrl + 'api/savePermission', rolesData).subscribe((data: any) => {

      this.toastr.successToastr(data, 'Success', { toastTimeout: (2500) }); return;
    });
  }

  //edit role data
  edit(item) {

    this.erpRoleName = item.erpRoleName;
    this.erpRoleCd = item.erpRoleCd;
    //getting specific role data and assign it to role tree
    this.getRoleTree(this.erpRoleCd);
    return false;
  }

  //add permissions of each menu
  addPermission(item) {
    this.erpRoleName = item.erpRoleName;
    this.erpRoleCd = item.erpRoleCd;
    //getting specific role data and assign it to role tree
    this.getRoleTree(this.erpRoleCd);
  }

  //getting roles data from database and show in role table 
  getRole() {
    this.http.get(this.serverUrl + 'api/getUserRoles').subscribe((data: any) => {
      this.roles = data;
    });
  }

  //getting specific role data and assign it to role tree
  getRoleTree(item) {

    this.roleTree = [];
    this.roleList = [];

    this.http.get(this.serverUrl + 'api/getRoleTree/' + item).subscribe((data: any) => {

      this.tempRoleList = data;
      this.employees = data;

      for (var i = 0; i < this.employees.length; i++) {

        //checking if type is module
        if (this.employees[i].erpObjctTypeCd == 1) {

          this.roleChildren = [];

          for (var j = 0; j < this.employees.length; j++) {

            if (this.employees[j].erpObjctTypeCd == 2
              && this.employees[j].parentErpObjctCd == this.employees[i].erpObjctCd) {

              this.roleChildren.push({
                label: this.employees[j].erpObjctName,
                data: [{
                  objName: this.employees[j].erpObjctName,
                  typeCode: this.employees[j].erpObjctTypeCd,
                  objCode: this.employees[j].erpObjctCd,
                  parentErpObjCd: this.employees[i].erpObjctCd,
                  parentErpObjTypeCd: this.employees[i].erpObjctTypeCd,
                  parentErpObjName: this.employees[i].erpObjctName
                }]
              });

            }

          }

          this.roleList.push({
            label: this.employees[i].erpObjctName,
            data: [{
              objName: this.employees[i].erpObjctName,
              typeCode: this.employees[i].erpObjctTypeCd,
              objCode: this.employees[i].erpObjctCd
            }],
            children: this.roleChildren
          });

        }

      }

      this.roleTree = this.roleList;

    });
  }

  //Menu list filter method 
  getFilterMenu(item) {

    return this.tempRoleList.filter(x => x.parentErpObjctCd == item && x.erpObjctTypeCd == 2);
  }

  //Module list filter method 
  getFilterModule() {
    //alert(roleId);
    return this.tempRoleList.filter(x => x.erpObjctTypeCd == 1);
  }

  //getting all modules including with menu and assign all data to menu tree 
  getMenu() {

    this.http.get(this.serverUrl + 'api/getUserMenu').subscribe((data: any) => {
      this.employees = data;

      for (var i = 0; i < this.employees.length; i++) {
        //checking if type is module
        if (this.employees[i].erpobjctTypeCd == 1) {

          this.children = [];

          for (var j = 0; j < this.employees.length; j++) {
            //checking if type is menu and current menu parent id and module id are same 
            if (this.employees[j].erpobjctTypeCd == 2
              && this.employees[j].parentErpobjctCd == this.employees[i].erpobjctCd) {

              this.children.push({
                label: this.employees[j].erpobjctName,
                data: [{
                  objName: this.employees[j].erpobjctName,
                  typeCode: this.employees[j].erpobjctTypeCd,
                  objCode: this.employees[j].erpobjctCd,
                  parentErpObjCd: this.employees[i].erpobjctCd,
                  parentErpObjTypeCd: this.employees[i].erpobjctTypeCd,
                  parentErpObjName: this.employees[i].erpobjctName
                }]
              });

            }

          }

          this.menuList.push({
            label: this.employees[i].erpobjctName,
            data: [{
              objName: this.employees[i].erpobjctName,
              typeCode: this.employees[i].erpobjctTypeCd,
              objCode: this.employees[i].erpobjctCd
            }],
            children: this.children
          });

        }

      }

      this.menuTree = this.menuList;
    });
  }

  //clear all data
  clear() {

    this.roleTree = [];
    this.roleList = [];
    this.erpRoleName = "";
    this.erpRoleCd = "";
    this.txtdPassword = "";
    this.txtdPin = "";
  }
}
