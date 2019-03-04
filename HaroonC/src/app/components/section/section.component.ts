import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { allSettled } from 'q';

declare var $: any;

@Component({
    selector: 'app-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

    serverUrl = "http://localhost:55536/";
    tokenKey = "token";

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    //* variables for display values on page



    //*Variables for NgModels
    tblSearch;
    dSectionId = '';
    sectionId = '';
    sectionName = '';
    cmbSection = '';
    cmbHeadQuarter = '';
    cmbDepartment = '';

    txtdPassword = '';
    txtdPin = '';



    //*List Variables
    sections = [
        { sectionId: '1', sectionName: 'Security' },
        { sectionId: '2', sectionName: 'Audit' },
        { sectionId: '3', sectionName: 'Tax' }
    ];

    headquarters = [
        { hqId: '1', hqName: 'Lahore Branch' },
        { hqId: '2', hqName: 'Multan Branch' },
        { hqId: '3', hqName: 'Rawalpindi Branch' }
    ];

    departments = [
        { departmentId: '1', departmentName: 'Finance' },
        { departmentId: '2', departmentName: 'HR & Admin' },
        { departmentId: '3', departmentName: 'Marketing' }
    ];

    sectionDetail = [
        { sectionDetailId: 1, sectionId: '1', hqId: '1', departmentId: '1', Section: 'Security', HeadQuarter: "Lahore Branch", Department: 'Finance' },
        { sectionDetailId: 2, sectionId: '2', hqId: '2', departmentId: '2', Section: 'Audit', HeadQuarter: "Multan Branch", Department: 'HR & Admin' },
        { sectionDetailId: 3, sectionId: '3', hqId: '3', departmentId: '3', Section: 'Tax', HeadQuarter: "Rawalpindi Branch", Department: 'Marketing' }
    ];



    constructor(private toastr: ToastrManager, private http: HttpClient) { }

    ngOnInit() {
    }

    //Function for save and update currency 
    save() {

        if (this.cmbHeadQuarter == '') {
            this.toastr.errorToastr('Please select head quarter/office', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.cmbDepartment == '') {
            this.toastr.errorToastr('Please select department', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.cmbSection == '') {
            this.toastr.errorToastr('Please select enter section name', 'Error', { toastTimeout: (2500) });
            return false;
        } else {

            if (this.sectionId != '') {
                this.toastr.successToastr('updated successfully', 'Error', { toastTimeout: (2500) });
                this.clear();
                return false;

                var updateData = { "ID": this.sectionId, Password: this.txtdPassword, PIN: this.txtdPin };

                var token = localStorage.getItem(this.tokenKey);

                var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

                this.http.put(this.serverUrl + 'api/pwCreate', updateData, { headers: reqHeader }).subscribe((data: any) => {

                    if (data.msg != undefined) {
                        this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
                        return false;
                    } else {
                        this.toastr.successToastr('Record updated Successfully', 'Success!', { toastTimeout: (2500) });
                        $('#actionModal').modal('hide');
                        return false;
                    }

                });


            } else {
                this.toastr.successToastr('saved successfully', 'Error', { toastTimeout: (2500) });
                this.clear();
                return false;


                var saveData = { "Password": this.txtdPassword, "PIN": this.txtdPin };

                var token = localStorage.getItem(this.tokenKey);

                var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

                this.http.post(this.serverUrl + 'api/pwCreate', saveData, { headers: reqHeader }).subscribe((data: any) => {

                    if (data.msg != undefined) {
                        this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
                        return false;
                    } else {
                        this.toastr.successToastr('Record saved Successfully', 'Success!', { toastTimeout: (2500) });
                        $('#actionModal').modal('hide');
                        return false;
                    }

                });
            }
        }
    }

    //function for empty all fields
    clear() {

        this.dSectionId = '';
        this.sectionId = ''
        this.sectionName = '';
        this.cmbHeadQuarter = '';
        this.cmbDepartment = '';
        this.cmbSection = '';

        this.txtdPassword = '';
        this.txtdPin = '';

    }

    //function for edit existing currency 
    edit(item) {

        this.sectionId = item.sectionDetailId;
        this.cmbHeadQuarter = item.hqId;
        this.cmbDepartment = item.departmentId;
        this.cmbSection = item.sectionId;

    }

    //functions for delete currency
    deleteTemp(item) {

        this.dSectionId = item.sectionDetailId;

    }

    delete() {

        if (this.txtdPassword == '') {
            this.toastr.errorToastr('Please enter password', 'Error', { toastTimeout: (2500) });
            return false
        } else if (this.txtdPin == '') {
            this.toastr.errorToastr('Please enter PIN', 'Error', { toastTimeout: (2500) });
            return false
        } else if (this.dSectionId == '') {
            this.toastr.errorToastr('Invalid delete request', 'Error', { toastTimeout: (2500) });
            return false
        } else {


            this.toastr.successToastr('Deleted successfully', 'Error', { toastTimeout: (2500) });
            this.clear();

            $('#closeDeleteModel').click();

            return false;

            var data = { "ID": this.dSectionId, Password: this.txtdPassword, PIN: this.txtdPin };

            var token = localStorage.getItem(this.tokenKey);

            var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

            this.http.put(this.serverUrl + 'api/pwCreate', data, { headers: reqHeader }).subscribe((data: any) => {

                if (data.msg != undefined) {
                    this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
                    return false;
                } else {
                    this.toastr.successToastr('Record Deleted Successfully', 'Success!', { toastTimeout: (2500) });
                    $('#actionModal').modal('hide');
                    return false;
                }

            });

        }


    }

    //function for get all saved currencies from db
    getSectionDetail() {

        return false;

        var Token = localStorage.getItem(this.tokenKey);

        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token });

        this.http.get(this.serverUrl + 'api/usersDetail', { headers: reqHeader }).subscribe((data: any) => {
            this.sections = data
        });

    }

    //functin for save new section 
    addSection() {

        if (this.sectionName.trim() == '') {
            this.toastr.errorToastr('Please enter section name', 'Error', { toastTimeout: (2500) });
            return false;
        } else {

            let data = this.sections.find(x => x.sectionName == this.sectionName);

            if (data != undefined) {

                this.toastr.errorToastr('Section name already exist', 'Error', { toastTimeout: (2500) });
                return false;
            } else {


                this.toastr.successToastr('Saved successfully', 'Success', { toastTimeout: (2500) });

                this.sections.push({ sectionId: this.sections.length + "", sectionName: this.sectionName });

                this.clear();

                $('#addSectionModel').click();
                return false;

                var updateData = { "sectionname": this.sectionName };

                var token = localStorage.getItem(this.tokenKey);

                var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

                this.http.post(this.serverUrl + 'api/pwCreate', updateData, { headers: reqHeader }).subscribe((data: any) => {

                    if (data.msg != undefined) {
                        this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
                        return false;
                    } else {
                        this.toastr.successToastr('Record Deleted Successfully', 'Success!', { toastTimeout: (2500) });
                        $('#actionModal').modal('hide');
                        return false;
                    }

                });
            }
        }
    }

}
