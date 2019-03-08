import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { TreeNode } from '../../nodeTree/TreeNode';
import { NodeService } from '../../nodeTree/node.service';

import { OrderPipe } from 'ngx-order-pipe';
import { HttpClient } from '@angular/common/http';


declare var $: any;


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

  /// declaration
  employeeId = '';
  erpRoleCd = '';
  userName = '';
  txtdPassword = '';
  txtdPin = '';
  chkAdd = '';
  chkUpdate = '';
  chkDelete = '';
  chkView = '';
  panelOpenState = true;
  erpRoleName = '';
  cmbModule = '';

  //Page Models
  query = '';
  pageEntryValue = '5';

  menuTree: TreeNode[];

  selectedMenu: TreeNode[];

  roleTree: TreeNode[];

  selectedRole: TreeNode[];



  serverUrl = "https://localhost:5001/";

  constructor(private http: HttpClient, public toastr: ToastrManager, private nodeService: NodeService) { }

  //list variables
  public employees;
  public modules;
  public menus;
  public roles;
  public menuList = [];
  public children = [];
  public roleList = [];
  public roleChildren = [];
  public erpObjct: Array<erpObject> = [];
  dataArray: string[] = [];

  entries = [
    { entryNumber: '5' },
    { entryNumber: '10' },
    { entryNumber: '15' },
    { entryNumber: '25' },
    { entryNumber: '50' },
    { entryNumber: '100' }
  ]

  ngOnInit() {

    this.getMenu();
    this.getRole();
    //for (var i = 0; i<this.employee.)

    // $(document).ready(function () {
    //   $('#example').DataTable();
    // });
  }

  setOrder(value: any) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  addRoles() {

    var itemFound = false;
    var itemIndex = 0;
    this.roleChildren = [];

    if (this.selectedMenu == undefined) {
      this.toastr.errorToastr('Please Select Nodes!', 'Error', { toastTimeout: (2500) }); return;
    }
    //alert(this.selectedMenu[0].children.length);

    //if module is selected
    if (this.selectedMenu[0].data[0].typeCode == 1) {
      //if role tree is empty
      if (this.roleTree == undefined) {

        for (var i = 0; i < this.selectedMenu[0].children.length; i++) {
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
                //alert(this.selectedMenu[0].children[i].data[0].objCode + ' - ' + this.roleTree[itemIndex].children[j].data[0].objCode)
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
          if (this.selectedMenu[0].data[0].parentErpObjCd == this.roleTree[i].data[0].objCode) {
            itemFound = true;
            itemIndex = i;
            i = this.roleTree.length + 1;
          }
        }
        if (itemFound == true) {
          //alert(this.roleTree[itemIndex].data[0].objNmae);
          itemFound = false;
          for (var i = 0; i < this.roleTree[itemIndex].children.length; i++) {
            if (this.selectedMenu[0].data[0].objCode == this.roleTree[itemIndex].children[i].data[0].objCode) {
              itemFound = true;
              i = this.roleTree[itemIndex].children.length + 1;
            } else {
              itemFound = false;
            }
            //alert(this.roleTree[itemIndex].children[i].data[0].objName)
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

  removeRoles() {

    if (this.selectedRole == undefined) {
      this.toastr.errorToastr('Please Select Nodes to Remove!', 'Error', { toastTimeout: (2500) }); return;
    }

    //alert(this.selectedRole[0].data);
    //alert(this.selectedRole[0].data); return
    if (this.selectedRole && this.selectedRole[0].data) {
      let index = this.selectedRole[0].data[0].children.indexOf(this.selectedRole[0]);
      this.selectedRole[0].data[0].children.splice(index, 1);
    }
  }
  delete() {
    this.toastr.successToastr('Record Deleted Successfully', 'Error', { toastTimeout: (2500) });
    return false;
  }

  save() {

    if (this.erpRoleName.trim().length == 0) {

      this.toastr.errorToastr('Please Enter Role Name', 'Oops!', { toastTimeout: (2500) });
      return;
    } else if (this.roleTree == undefined) {
      this.toastr.errorToastr('Please Push Data in Role Tree', 'Error', { toastTimeout: (2500) }); return
    }

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

      var roleData = { erpObjct: JSON.stringify(this.erpObjct), erpRoleName: this.erpRoleName };
      this.http.post(this.serverUrl + 'api/saveUserRole', roleData).subscribe((data: any) => {
        alert(data);
        alert(data.response); return
        this.toastr.successToastr(data, 'Success', { toastTimeout: (2500) });
      });
    } else {

      var rolesData = { erpObjct: JSON.stringify(this.erpObjct), erpRoleCd: this.erpRoleCd, erpRoleName: this.erpRoleName };
      this.http.put(this.serverUrl + 'api/updateUserRole', rolesData).subscribe((data: any) => {
        alert(data);
        alert(data.response); return
        this.toastr.successToastr(data, 'Success', { toastTimeout: (2500) });
      });
    }

  }

  savePermission() {

  }

  edit(item) {

    this.erpRoleName = item.erpRoleName;
    this.erpRoleCd = item.erpRoleCd;
    //alert(this.roleTree);
    this.getRoleTree(this.erpRoleCd);
    //.toastr.successToastr('Record Edited Successfully', 'Error', { toastTimeout: (2500) });
    return false;
  }

  editPermission(item) {
    this.erpRoleName = item.erpRoleName;
    this.erpRoleCd = item.erpRoleCd;
  }

  getRole() {
    this.http.get(this.serverUrl + 'api/getUserRoles').subscribe((data: any) => {
      this.roles = data;
    });
  }

  getRoleTree(item) {

    this.roleTree = [];
    this.roleList = [];

    this.http.get(this.serverUrl + 'api/getRoleTree/' + item).subscribe((data: any) => {

      this.employees = data;

      for (var i = 0; i < this.employees.length; i++) {

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

  getMenu() {
    //var itemBackup = localStorage.getItem(this.tokenKey);

    //var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + itemBackup });

    this.http.get(this.serverUrl + 'api/getUserMenu').subscribe((data: any) => {
      this.employees = data;

      for (var i = 0; i < this.employees.length; i++) {

        if (this.employees[i].erpobjctTypeCd == 1) {

          this.children = [];

          for (var j = 0; j < this.employees.length; j++) {

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

  clear() {

    this.roleTree = [];
    this.roleList = [];
    this.erpRoleName = "";
    this.erpRoleCd = "";
  }
}
