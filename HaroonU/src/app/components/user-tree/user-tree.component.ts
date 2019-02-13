import { Component, OnInit, Directive } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, ReactiveFormsModule, FormArrayName, FormControlName, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

declare var $: any;

//var fileId = 0; // used by the addFile() function to keep track of IDs
//var count = 0;
//use in combobox
export interface Modules {
  moduleNo: string;
  moduleName: string;
}
//
//use in combobox
export interface Menu {
  menuNo: string;
  menuName: string;
}
//
//use in combobox
export interface SubMenu {
  subMenuNo: string;
  subMenuName: string;
}
//

export interface AddRow {
  selectValue: string;
  rowRemove: string;
}

@Component({
  selector: 'app-user-tree',
  templateUrl: './user-tree.component.html',
  styleUrls: ['./user-tree.component.scss']
})

export class UserTreeComponent implements OnInit {

  // menuCombo = new FormControl('');
  // menuAddButton = new FormControl('');
  // menuDeleteButton = new FormControl('');

  // menuCombo: '';
  // menuComboButton: '';

  public edited = false;
  public edited1 = false;

  employeeForm: FormGroup;

  // employeeForm = new FormGroup({
  //   menuCombo: new FormControl(''),
  //   menuAddButton: new FormControl(''),
  //   menuDeleteButton: new FormControl('')
  // });
  //products: FormArrayName;

  constructor(private fb: FormBuilder) { }

  public menuBox = false;
  public subMenuBox = false;
  public subMenuBoxApend = false;
  public addSubMenuBtn = false;

  //public delBtn = true;

  userModalForm: FormGroup;
  items: FormArray;

  /// declaration
  searchModule = '';
  searchMenu = '';
  searchSubMenu = '';

  //page ngModels
  cmbModule: '';
  cmbMenu: '';
  cmbSubMenu: '';
  rowRemove: '';

  delButton: '';
  moduleValue: '';
  menuValue: '';
  subMenuValue: '';

  //use in combobox
  modules: Modules[] = [
    { moduleNo: '1', moduleName: 'Finance' },
    { moduleNo: '2', moduleName: 'Human Resource' },
    { moduleNo: '2', moduleName: 'Procurement' }
  ]

  //use in combobox
  menus: Menu[] = [
    { menuNo: '1', menuName: 'Audit' },
    { menuNo: '2', menuName: 'Supply Chain Management' }
  ]

  //use in combobox
  submenus: SubMenu[] = [
    { subMenuNo: '1', subMenuName: 'Annual' },
    { subMenuNo: '2', subMenuName: 'Accessories' }
  ]

  //--------------------------------------2nd Approach Starts----------------------------------//

  ngOnInit() {
    this.employeeForm = this.fb.group({
      products: this.fb.array([this.addProductsGroup()])
    });
  }

  addProductsGroup() {
    return this.fb.group({
      menuCombo: ['', Validators.required]
    })
    //this.productsValue.push(prod);
  }

  addProducts() {
    this.productsValue.push(this.addProductsGroup());
  }

  get productsValue() {
    return <FormArray>this.employeeForm.get('products');
  }

  deleteProducts(i) {
    this.productsValue.removeAt(i);
    this.edited1 = true;
    setTimeout(function () {
      this.edited1 = false;
      console.log(this.edited1);
    }.bind(this), 2000);
  }
  //--------------------------------------2nd Approach Ends------------------------------------//

  //---------------------------------------------//
  // ngOnInit() {
  //   this.employeeForm = this.fb.group({
  //     products: this.fb.array([])
  //   });
  // }
  // get productsValue() {
  //   return this.employeeForm.get('products') as FormArray
  // }

  // addProducts() {
  //   const prod = this.fb.group({
  //     menuCombo: ['', Validators.required],
  //     menuAddButton: [''],
  //     menuDeleteButton: ['']
  //   })
  //   this.productsValue.push(prod);
  //   //alert(this.delBtn);
  //   // count++;
  //   // alert(count);
  // }

  // deleteProducts(i) {
  //   this.productsValue.removeAt(i);
  //   this.edited1 = true;
  //   setTimeout(function () {
  //     this.edited1 = false;
  //     console.log(this.edited1);
  //   }.bind(this), 2000);
  // }
  //---------------------------------------------//
  // onMenuChange() {
  //   this.addSubMenuBtn = true;
  // }

  onModuleChange() {
    if (this.cmbModule != null) {
      this.menuBox = true;
    }
    else {
      this.menuBox = false;
    }
  }

  saveModuleData() {
    if (this.moduleValue != null) {
      this.edited = true;
      setTimeout(function () {
        this.edited = false;
        console.log(this.edited);
      }.bind(this), 2000);
      // alert("Data Inserted Successfully.")
      $('#addModule').modal('hide');
    }
    else {
      alert("Insert Data...!!!")
    }
  }

  saveMenuData() {
    if (this.menuValue != null) {
      this.edited = true;
      setTimeout(function () {
        this.edited = false;
        console.log(this.edited);
      }.bind(this), 2000);
      // alert("Data Inserted Successfully.")
      $('#addMenu').modal('hide');
    }
    else {
      alert("Insert Data...!!!")
    }
  }

  saveSubMenuData() {
    if (this.subMenuValue != null) {
      this.edited = true;
      setTimeout(function () {
        this.edited = false;
        console.log(this.edited);
      }.bind(this), 2000);
      // alert("Data Inserted Successfully.")
      $('#addSubMenu').modal('hide');
    }
    else {
      alert("Insert Data...!!!")
    }
  }

}
