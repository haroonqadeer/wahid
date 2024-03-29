import { Component, OnInit, Directive } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, ReactiveFormsModule, FormArrayName, FormControlName, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrManager } from 'ng6-toastr-notifications';

declare var $: any;

//use in combobox
export interface Modules {
    moduleNo: string;
    moduleName: string;
}

//use in combobox
export interface Menu {
    menuNo: string;
    menuName: string;
}

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

    public employeeForm: FormGroup;
    //public menuCombo: FormControl;

    constructor(private fb: FormBuilder, public toastr: ToastrManager) { }

    public mdouleBox = false;
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
        //Creating Array of ComboBox "products"
        this.employeeForm = this.fb.group({
            products: this.fb.array([])
        });
    }

    addProductsGroup() {
        return this.fb.group({
            menuComboText: [''],
            menuCombo: ['', Validators.required]
        })
    }

    // Add New ComboBox to an array()
    addProducts() {
        this.productsValue.push(this.addProductsGroup());
    }

    //Getting new ComboBox from array and show in front page
    get productsValue() {
        return <FormArray>this.employeeForm.get('products');
    }

    //Deleting every comboBox with specific id which is ([formGroupName]="i")
    deleteProducts(i) {
        //this.productsValue.removeAt(i);
        //alert(i);
        alert(this.employeeForm.get('menuCombo'));
        //alert(this.productsValue[i]);
    }

    onModuleChange() {
        if (this.cmbModule != null) {
            this.mdouleBox = true;
        }
        else {
            this.mdouleBox = false;
        }
    }

    onMenuChange() {
        if (this.cmbMenu != null) {
            this.menuBox = true;
        }
        else {
            this.menuBox = false;
        }
    }

    saveModuleData() {
        if (this.moduleValue != null) {
            $('#addModule').modal('hide');
            this.toastr.successToastr('Module Inserted Successfully', 'Success', { toastTimeout: (2500) }); return false;
        }
        else {
            this.toastr.errorToastr('Please Enter Module Name', 'Error', { toastTimeout: (2500) }); return false;

            //alert("Insert Data...!!!")
        }
    }

    saveMenuData() {
        if (this.menuValue != null) {
            $('#addMenu').modal('hide');
            this.toastr.successToastr('Menu Inserted Successfully', 'Success', { toastTimeout: (2500) }); return false;
            // this.edited = true;
            // setTimeout(function () {
            //   this.edited = false;
            //   console.log(this.edited);
            // }.bind(this), 2000);
            // // alert("Data Inserted Successfully.")
        }
        else {
            this.toastr.errorToastr('Please Enter Menu Name', 'Error', { toastTimeout: (2500) }); return false;
        }
    }

    saveSubMenuData() {
        if (this.subMenuValue != null) {
            $('#addSubMenu').modal('hide');
            this.toastr.successToastr('Sub-Menu Inserted Successfully', 'Success', { toastTimeout: (2500) }); return false;

            // this.edited = true;
            // setTimeout(function () {
            //   this.edited = false;
            //   console.log(this.edited);
            // }.bind(this), 2000);
            // // alert("Data Inserted Successfully.")

        }
        else {
            this.toastr.errorToastr('Please Enter Sub-Menu Name', 'Error', { toastTimeout: (2500) }); return false;
        }

    }
}
