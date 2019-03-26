import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { NullAstVisitor } from '@angular/compiler';

@Component({
  selector: 'app-companydashboard',
  templateUrl: './companydashboard.component.html',
  styleUrls: ['./companydashboard.component.scss'],

  encapsulation: ViewEncapsulation.None

})
export class CompanydashboardComponent implements OnInit {

  //ngprime organization chart 
  data1: TreeNode[];

  selectedNode: TreeNode;
  public orgList = [];
  public compChild = [];
  public branchChild = [];
  public deptChild = [];

  public orgData = [
    {
      companyId: 1,
      companyName: "Pak Electronics",
      branchId: 0,
      branchName: null,
      deptId: 0,
      deptName: null,
      parentDeptId: 0,
      deptLevelNo: 0
    },
    {
      companyId: 1,
      companyName: "Pak Electronics",
      branchId: 1,
      branchName: "Islamabad",
      deptId: 0,
      deptName: null,
      parentDeptId: 0,
      deptLevelNo: 0
    },
    {
      companyId: 1,
      companyName: "Pak Electronics",
      branchId: 2,
      branchName: "Karachi",
      deptId: 0,
      deptName: null,
      parentDeptId: 0,
      deptLevelNo: 0
    },
    {
      companyId: 1,
      companyName: "Pak Electronics",
      branchId: 3,
      branchName: "Lahore",
      deptId: 0,
      deptName: null,
      parentDeptId: 0,
      deptLevelNo: 0
    },
    {
      companyId: 1,
      companyName: "Pak Electronics",
      branchId: 1,
      branchName: "Islamabad",
      deptId: 1,
      deptName: "Admin",
      parentDeptId: 0,
      deptLevelNo: 1
    },
    {
      companyId: 1,
      companyName: "Pak Electronics",
      branchId: 1,
      branchName: "Islamabad",
      deptId: 2,
      deptName: "Finance",
      parentDeptId: 0,
      deptLevelNo: 1
    },
    {
      companyId: 1,
      companyName: "Pak Electronics",
      branchId: 3,
      branchName: "Lahore",
      deptId: 3,
      deptName: "Production",
      parentDeptId: 0,
      deptLevelNo: 1
    },
    {
      companyId: 1,
      companyName: "Pak Electronics",
      branchId: 3,
      branchName: "Lahore",
      deptId: 4,
      deptName: "Operation",
      parentDeptId: 0,
      deptLevelNo: 1
    },
    {
      companyId: 1,
      companyName: "Pak Electronics",
      branchId: 1,
      branchName: "Islamabad",
      deptId: 5,
      deptName: "Payment",
      parentDeptId: 2,
      deptLevelNo: 2
    },
    {
      companyId: 1,
      companyName: "Pak Electronics",
      branchId: 1,
      branchName: "Islamabad",
      deptId: 6,
      deptName: "Receipt",
      parentDeptId: 2,
      deptLevelNo: 2
    },
    {
      companyId: 1,
      companyName: "Pak Electronics",
      branchId: 3,
      branchName: "Lahore",
      deptId: 7,
      deptName: "Management",
      parentDeptId: 4,
      deptLevelNo: 2
    },
    {
      companyId: 1,
      companyName: "Pak Electronics",
      branchId: 4,
      branchName: "Peshawar",
      deptId: 0,
      deptName: null,
      parentDeptId: 0,
      deptLevelNo: 0
    },
    {
      companyId: 1,
      companyName: "Pak Electronics",
      branchId: 3,
      branchName: "Lahore",
      deptId: 8,
      deptName: "IT",
      parentDeptId: 0,
      deptLevelNo: 1
    },
    {
      companyId: 1,
      companyName: "Pak Electronics",
      branchId: 4,
      branchName: "Peshawar",
      deptId: 9,
      deptName: "HR",
      parentDeptId: 0,
      deptLevelNo: 1
    }
  ]
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getChartData();
  }

  //getting organizational chart Data
  getChartData() {

    for (var i = 0; i < this.orgData.length; i++) {
      if (this.orgData[i].companyName != null) {
        for (var j = 0; j < this.orgData.length; j++) {

          if (this.orgData[j].branchName != null &&
            this.orgData[j].deptName == null) {
            this.branchChild = [];
            for (var k = 0; k < this.orgData.length; k++) {
              if (this.orgData[k].deptLevelNo == 1 &&
                this.orgData[j].branchId == this.orgData[k].branchId) {
                this.deptChild = [];
                for (var l = 0; l < this.orgData.length; l++) {
                  if (this.orgData[l].deptLevelNo == 2 &&
                    this.orgData[l].parentDeptId == this.orgData[k].deptId) {
                    this.deptChild.push({
                      label: this.orgData[l].deptName,
                      styleClass: 'department-cfo'
                    });
                  }
                }
                this.branchChild.push({
                  label: this.orgData[k].deptName,
                  styleClass: 'department-cto',
                  children: this.deptChild
                });
              }
            }
            this.compChild.push({
              label: this.orgData[j].branchName,
              styleClass: 'ui-person',
              type: 'person',
              expanded: true,
              data: { name: '' },
              children: this.branchChild
            });
          }
        }
      }

      this.orgList.push({
        label: this.orgData[i].companyName,
        styleClass: 'ui-person',
        type: 'person',
        expanded: true,
        data: { name: '' },
        children: this.compChild
      });
      i = this.orgData.length + 1;
    }

    this.data1 = this.orgList;
  }
}
