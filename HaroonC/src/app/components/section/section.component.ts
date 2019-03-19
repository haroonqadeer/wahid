import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { allSettled } from 'q';

import { NgxSpinnerService } from 'ngx-spinner';

import * as jsPDF from 'jspdf';

import {
	IgxExcelExporterOptions,
	IgxExcelExporterService,
	IgxGridComponent,
	IgxCsvExporterService,
	IgxCsvExporterOptions,
	CsvFileTypes
} from "igniteui-angular";


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

	//* variables for pagination and orderby pipe
	p = 1;
	order = 'info.name';
	reverse = false;
	sortedCollection: any[];
	itemPerPage = '10';



	//*List Variables
	sections = [
		{ sectionId: '1', sectionName: 'Internal Audit' },
		{ sectionId: '2', sectionName: 'SCM' },
		{ sectionId: '3', sectionName: 'System Services' }
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
		{
			sectionDetailId: 1,
			sectionId: '1',
			hqId: '1',
			departmentId: '1',
			Section: 'Security',
			HeadQuarter: "Lahore Branch",
			Department: 'Finance'
		},
		{
			sectionDetailId: 2,
			sectionId: '2',
			hqId: '2',
			departmentId: '2',
			Section: 'Audit',
			HeadQuarter: "Multan Branch",
			Department: 'HR & Admin'
		},
		{
			sectionDetailId: 3,
			sectionId: '3',
			hqId: '3',
			departmentId: '3',
			Section: 'Tax',
			HeadQuarter: "Rawalpindi Branch",
			Department: 'Marketing'
		},
		{
			sectionDetailId: 4,
			sectionId: '3',
			hqId: '3',
			departmentId: '3',
			Section: 'Tax',
			HeadQuarter: "Rawalpindi Branch",
			Department: 'Marketing'
		},
		{
			sectionDetailId: 5,
			sectionId: '3',
			hqId: '3',
			departmentId: '3',
			Section: 'Tax',
			HeadQuarter: "Rawalpindi Branch",
			Department: 'Marketing'
		},
		{
			sectionDetailId: 6,
			sectionId: '1',
			hqId: '1',
			departmentId: '1',
			Section: 'Security',
			HeadQuarter: "Lahore Branch",
			Department: 'Finance'
		},
		{
			sectionDetailId: 7,
			sectionId: '2',
			hqId: '2',
			departmentId: '2',
			Section: 'Audit',
			HeadQuarter: "Multan Branch",
			Department: 'HR & Admin'
		},
		{
			sectionDetailId: 8,
			sectionId: '3',
			hqId: '3',
			departmentId: '3',
			Section: 'Tax',
			HeadQuarter: "Rawalpindi Branch",
			Department: 'Marketing'
		},
		{
			sectionDetailId: 9,
			sectionId: '3',
			hqId: '3',
			departmentId: '3',
			Section: 'Tax',
			HeadQuarter: "Rawalpindi Branch",
			Department: 'Marketing'
		},
		{
			sectionDetailId: 10,
			sectionId: '3',
			hqId: '3',
			departmentId: '3',
			Section: 'Tax',
			HeadQuarter: "Rawalpindi Branch",
			Department: 'Marketing'
		},
		{
			sectionDetailId: 11,
			sectionId: '1',
			hqId: '1',
			departmentId: '1',
			Section: 'Security',
			HeadQuarter: "Lahore Branch",
			Department: 'Finance'
		},
		{
			sectionDetailId: 12,
			sectionId: '2',
			hqId: '2',
			departmentId: '2',
			Section: 'Audit',
			HeadQuarter: "Multan Branch",
			Department: 'HR & Admin'
		},
		{
			sectionDetailId: 13,
			sectionId: '3',
			hqId: '3',
			departmentId: '3',
			Section: 'Tax',
			HeadQuarter: "Rawalpindi Branch",
			Department: 'Marketing'
		},
		{
			sectionDetailId: 14,
			sectionId: '3',
			hqId: '3',
			departmentId: '3',
			Section: 'Tax',
			HeadQuarter: "Rawalpindi Branch",
			Department: 'Marketing'
		},
		{
			sectionDetailId: 15,
			sectionId: '3',
			hqId: '3',
			departmentId: '3',
			Section: 'Tax',
			HeadQuarter: "Rawalpindi Branch",
			Department: 'Marketing'
		}
	];


	constructor(private toastr: ToastrManager,
		private http: HttpClient,
		private spinner: NgxSpinnerService,
		private excelExportService: IgxExcelExporterService,
		private csvExportService: IgxCsvExporterService) { }

	ngOnInit() {
		this.getSectionDetail();
	}

	@ViewChild("exportDataContent") public exportDataContent: IgxGridComponent;
	@ViewChild("exportPDF") public exportPDF: ElementRef;

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
				this.showSpinner();
				this.hideSpinner();
				this.toastr.successToastr('updated successfully', 'Error', { toastTimeout: (2500) });
				this.clear();

				return false;

				var updateData = { "ID": this.sectionId, "Password": this.txtdPassword, "PIN": this.txtdPin };

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
				this.showSpinner();
				this.hideSpinner();
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
		this.clear();
		this.dSectionId = item.sectionDetailId;
	}

	//delete function 
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

			this.showSpinner();
			this.hideSpinner();
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


				this.showSpinner();
				this.hideSpinner();
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

	//function for sort table data 
	setOrder(value: string) {

		if (this.order === value) {
			this.reverse = !this.reverse;
		}

		this.order = value;
	}

	// For Print Purpose 
	printDiv() {

		var commonCss = ".commonCss{font-family: Arial, Helvetica, sans-serif; text-align: center; }";

		var cssHeading = ".cssHeading {font-size: 25px; font-weight: bold;}";
		var cssAddress = ".cssAddress {font-size: 16px; }";
		var cssContact = ".cssContact {font-size: 16px; }";

		var tableCss = "table {width: 100%; border-collapse: collapse;}    table thead tr th {text-align: left; font-family: Arial, Helvetica, sans-serif; font-weight: bole; border-bottom: 1px solid black; margin-left: -3px;}     table tbody tr td {font-family: Arial, Helvetica, sans-serif; border-bottom: 1px solid #ccc; margin-left: -3px; height: 33px;}";

		var printCss = commonCss + cssHeading + cssAddress + cssContact + tableCss;


		//printCss = printCss + "";

		var contents = $("#printArea").html();

		var frame1 = $('<iframe />');
		frame1[0].name = "frame1";
		frame1.css({ "position": "absolute", "top": "-1000000px" });
		$("body").append(frame1);
		var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
		frameDoc.document.open();

		//Create a new HTML document.
		frameDoc.document.write('<html><head><title>DIV Contents</title>' + "<style>" + printCss + "</style>");


		//Append the external CSS file.  <link rel="stylesheet" href="../../../styles.scss" />  <link rel="stylesheet" href="../../../../node_modules/bootstrap/dist/css/bootstrap.min.css" />
		frameDoc.document.write('<style type="text/css" media="print">/*@page { size: landscape; }*/</style>');

		frameDoc.document.write('</head><body>');

		//Append the DIV contents.
		frameDoc.document.write(contents);
		frameDoc.document.write('</body></html>');

		frameDoc.document.close();


		//alert(frameDoc.document.head.innerHTML);
		// alert(frameDoc.document.body.innerHTML);

		setTimeout(function () {
			window.frames["frame1"].focus();
			window.frames["frame1"].print();
			frame1.remove();
		}, 500);
	}

	// For PDF Download
	downloadPDF() {

		var doc = new jsPDF("p", "pt", "A4"),
			source = $("#printArea")[0],
			margins = {
				top: 75,
				right: 30,
				bottom: 50,
				left: 30,
				width: 50
			};
		doc.fromHTML(
			source, // HTML string or DOM elem ref.
			margins.left, // x coord
			margins.top,
			{
				// y coord
				width: margins.width // max width of content on PDF
			},
			function (dispose) {
				// dispose: object with X, Y of the last line add to the PDF
				//          this allow the insertion of new lines after html
				doc.save("Test.pdf");
			},
			margins
		);
	}

	//For CSV File 
	public downloadCSV() {
		this.csvExportService.exportData(this.sectionDetail, new IgxCsvExporterOptions("ExportedCSVFile", CsvFileTypes.CSV));
	}

	//For Exce File
	public downloadExcel() {
		this.excelExportService.export(this.exportDataContent, new IgxExcelExporterOptions("ExportedExcelFileNew"));
	}



	// Functions for Show & Hide Spinner
	showSpinner() {
		this.spinner.show();
	}

	hideSpinner() {
		setTimeout(() => {
			/** spinner ends after process done*/
			this.spinner.hide();
		});
	}
}

