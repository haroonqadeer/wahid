import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { AppComponent } from '../../app.component';
import { OrderPipe } from 'ngx-order-pipe';
import * as jsPDF from 'jspdf';
import {
    IgxExcelExporterOptions,
    IgxExcelExporterService,
    IgxGridComponent,
    IgxCsvExporterService,
    IgxCsvExporterOptions,
    CsvFileTypes
} from "igniteui-angular";
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';


//----------------------------------------------------------------------------//
//-------------------Working of this typescript file are as follows-----------//
//-------------------Getting Subsidiary data into main table -------------------//
//-------------------Add new Subsidiary into database --------------------------//
//-------------------Add new city into database --------------------------//
//-------------------Update Subsidiary into database ---------------------------//
//-------------------Delete Subsidiary from database ---------------------------//
//-------------------Export into PDF, CSV, Excel -----------------------------//
//-------------------Function for email validation -----------------------------//
//-------------------For sorting the record-----------------------------//
//----------------------------------------------------------------------------//


declare var $: any;
//declare// function showLoader(): any;

@Component({
    selector: 'app-subsidiarie',
    templateUrl: './subsidiarie.component.html',
    styleUrls: ['./subsidiarie.component.scss']
})

export class SubsidiarieComponent implements OnInit {


    constructor(private toastr: ToastrManager,
        private http: HttpClient,
        private app: AppComponent,
        private excelExportService: IgxExcelExporterService,
        private csvExportService: IgxCsvExporterService,
        private fb: FormBuilder) { }

    ngOnInit() {
        //Creating Array of ComboBox "subsidiaryes"
        // this.contactForm = this.fb.group({
        //     subsidiary: this.fb.array([])
        // });
    }

}
