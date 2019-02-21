import { Component, OnInit, Injectable } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';


declare var $: any;

@Component({
    selector: 'app-userprofile',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

    serverUrl = "http://localhost:55536/";
    tokenKey = "token";

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }


    chart: Chart;
    eName = '';

    //* variables for display values on page
    countAddition = 15;
    countUpdation = 10;
    countBanned = 5;
    partyEmail = '';
    partyFatherName = '';
    partyDepartment = '';
    partyBranch = '';
    partyAddress = '';
    userLink = '';
    userLinkCode = '';


    //*Variables for NgModels 
    searchAction = '';
    txtActionPassword = '';
    txtActionPIN = '';
    userId = 0;
    userSearch = '';
    rdbType = 'employee';
    searchEmployee = '';
    txtUsername = '';
    txtPassword = "";
    txtCnfrmPassword = "";


    //*Boolean ng models and variables
    disabledPassword = false;
    showLink = false;
    actionPassRow = false;
    actionPINCodeRow = false;
    actionBlockRow = false;


    //List variables
    public users = [];
    listAction = '';
    listBlockedAction = '';
    cmbEmployee = '';

    //Action Combobox object
    actions = [
        {
            actionId: '1',
            actionName: 'Block'
        },
        {
            actionId: '2',
            actionName: 'Delete'
        },
        {
            actionId: '3',
            actionName: 'Generate PIN'
        }
    ];

    // Block Action Combo Box
    blocks = [
        {
            blockId: '1',
            blockName: '1 Hour'
        },
        {
            blockId: '2',
            blockName: '1 Day'
        },
        {
            blockId: '3',
            blockName: '1 Week'
        },
        {
            blockId: '4',
            blockName: '1 Month'
        },
        {
            blockId: '5',
            blockName: 'Manual'
        }
    ]

    //Employee Combobox object
    employees = [
        {
            indvdlId: 1,
            eCNIC: '6110113445676',
            eName: 'Adnan',
            eDept: 'IT',
            eParty: 'Employee'
        },
        {
            indvdlId: 2,
            eCNIC: '6110112455675',
            eName: 'Ahmed',
            eDept: 'Accounts',
            eParty: 'Visitor'
        },
        {
            indvdlId: 3,
            eCNIC: '6110114356574',
            eName: 'Ali',
            eDept: 'Sales',
            eParty: 'Employee'
        },
        {
            indvdlId: 4,
            eCNIC: '6110116367563',
            eName: 'Amir',
            eDept: 'IT',
            eParty: 'Visitor'
        },
        {
            indvdlId: 5,
            eCNIC: '6110167345672',
            eName: 'Haroon',
            eDept: 'IT',
            eParty: 'Employee'
        }
    ];

    constructor(private http: HttpClient, public toastr: ToastrManager) { }

    ngOnInit() {
        this.init();


        this.getParty();
        // this.rdbType = 'employee';
        // this.getFilterItem(this.rdbType);
    }

    //get user management chart data
    init() {

        let chart = new Chart({
            chart: {
                type: 'area'
            },
            credits: {
                enabled: false
            },
            title: {
                text: ""
            },
            yAxis: {
                title: {
                    text: 'User Management Trend'
                }
            },
            series: [{
                name: 'Updations',
                data: [300, 500, 250, 200, 800, 1000, 2000]
            }, {
                name: 'Banned',
                data: [250, 100, 300, 650, 450, 800, 600]
            }, {
                name: 'Additions',
                data: [1, 1, 1, 100, 500, 800, 450]
            }]
        });

        this.chart = chart;

    }

    //party list filter method 
    getFilterItem(type) {
        return this.users.filter(x => x.type == type);
    }

    // On Action Change Modal Window Combo Box
    onActionChange() {
        // When user selects "Delete" in the Combo Box
        if (this.listAction == 'Delete') {
            this.actionBlockRow = false;
            this.actionPassRow = true;
            this.actionPINCodeRow = true;
            //Clear Text Boxes
            this.txtActionPassword = '';
            this.txtActionPIN = '';
        }
        // When user selects "Block" in the Combo Box
        else if (this.listAction == 'Block') {
            this.actionBlockRow = true;
            this.actionPassRow = true;
            this.actionPINCodeRow = true;
            //Clear Text Boxes
            this.listBlockedAction = '';
            this.txtActionPassword = '';
            this.txtActionPIN = '';
        }
        // When user selects "Generate PIN" in the Combo Box
        else if (this.listAction == 'Generate PIN') {
            this.actionBlockRow = false;
            this.actionPassRow = true;
            this.actionPINCodeRow = false;
            //Clear Text Boxes
            this.listBlockedAction = '';
            this.txtActionPassword = '';
            this.txtActionPIN = '';
        }
        else {
            return false;
        }
    }

    //bloock, delete and generate pin for user
    saveAction() {
        if (this.listAction == '') {
            this.toastr.errorToastr('Please Select Action Type', 'Error', { toastTimeout: (2500) });
            return false;
        } else {
            if (this.listAction == 'Block' && this.listBlockedAction == '') {
                //this.isLoginError = true;
                this.toastr.errorToastr('Please Select Block Time', 'Error', { toastTimeout: (2500) });
                return false;
            }
            else if (this.txtActionPassword == '') {
                //this.isLoginError = true;
                this.toastr.errorToastr('Please Enter Password', 'Error', { toastTimeout: (2500) });
                return false;
            }
            else if (this.txtActionPIN == '') {
                this.toastr.errorToastr('Please Enter PIN Code', 'Error', { toastTimeout: (2500) });
                return false;
            }
            else {


                var data = { "empId": this.userId, "action": this.listAction, "duration": this.listBlockedAction, "password": this.txtActionPassword, "pin": this.txtActionPIN };

                var token = localStorage.getItem(this.tokenKey);

                var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

                return this.http.post(this.serverUrl + 'api/action', data, { headers: reqHeader }).subscribe((data: any) => {

                    if (data.msg != undefined) {
                        this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
                        return false;
                    } else {
                        this.toastr.successToastr(data.msg, 'Success!', { toastTimeout: (2500) });
                        $('#actionModal').modal('hide');
                        return false;
                    }
                });
            }

        }
    }

    //create user name and password for party and send user name password
    saveEmployee() {
        if (this.rdbType == '') {
            this.toastr.errorToastr('Please select user type', 'Error', { toastTimeout: (2500) });
            return false;
        }
        else if (this.rdbType == 'employee' || this.rdbType == 'visitor') {
            if (this.cmbEmployee == '') {
                this.toastr.errorToastr('Please select user', 'Error', { toastTimeout: (2500) });
                return false;
            }
            else if (this.txtUsername.trim().length == 0) {
                this.toastr.errorToastr('Please enter user name', 'Error', { toastTimeout: (2500) });
                return false;
            }
            else if (this.txtPassword.trim().length == 0) {
                this.toastr.errorToastr('Please enter password', 'Error', { toastTimeout: (2500) });
                return false;
            }
            else if (this.txtPassword != this.txtCnfrmPassword) {
                this.toastr.errorToastr('Your password and confirmation password do not match.', 'Error', { toastTimeout: (2500) });
                return false;
            }
            else {

                var data = { "partyId": this.userId };

                var token = localStorage.getItem(this.tokenKey);

                var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

                this.http.put(this.serverUrl + 'api/pwCreate', data, { headers: reqHeader }).subscribe((data: any) => {

                    if (data.msg != undefined) {
                        this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
                        return false;
                    } else {
                        this.toastr.successToastr('Record Inserted Successfully', 'Success!', { toastTimeout: (2500) });
                        $('#actionModal').modal('hide');
                        return false;
                    }

                });
            }
        }
        else {
            return false;
        }
    }

    //create user name and password for party and send user name password
    sendLink() {
        if (this.rdbType == '') {
            this.toastr.errorToastr('Please select user type', 'Error', { toastTimeout: (2500) });
            return false;
        } else if (this.rdbType == 'employee' || this.rdbType == 'visitor') {

            if (this.cmbEmployee == '') {
                this.toastr.errorToastr('Please select user', 'Error', { toastTimeout: (2500) });
                return false;
            } else {

                var data = { "partyId": this.userId };

                var token = localStorage.getItem(this.tokenKey);

                var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

                this.http.put(this.serverUrl + 'api/pwCreate', data, { headers: reqHeader }).subscribe((data: any) => {

                    if (data.msg != undefined) {
                        this.toastr.errorToastr(data.msg, 'Error!', { toastTimeout: (2500) });
                        return false;
                    } else {
                        this.toastr.successToastr('Record Inserted Successfully', 'Success!', { toastTimeout: (2500) });
                        $('#actionModal').modal('hide');
                        return false;
                    }

                });
            }
        }
        else {
            return false;
        }
    }

    //if you want to clear input
    clear() {

        this.userId = 0;
        this.txtUsername = '';

    }

    //on Employee change model and action btn click 
    edit(item, actionType) {

        if (actionType == 'block') {

            this.userId = item.indvdlId;

        } else if (actionType == 'link') {

            this.userId = item.indvdlId;
            this.userLink = "localhost:4200?code=";
            this.userLinkCode = btoa(this.userId + "");

            this.partyEmail = item.emailAddrss;
            this.partyFatherName = '';
            this.partyDepartment = '';
            this.partyBranch = '';
            this.partyAddress = item.indvdlFirstName;

            this.showLink = true;
        }

    }

    //get partys function 
    getParty() {

        var itemBackup = localStorage.getItem(this.tokenKey);

        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + itemBackup });

        this.http.get(this.serverUrl + 'api/usersDetail', { headers: reqHeader }).subscribe((data: any) => {
            this.users = data
        });

    }
}

