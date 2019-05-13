import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { AppComponent } from '../../app.component';

declare var $: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],

  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {


  voucherDate = '';

  //ngprime organization chart 
  data1: TreeNode[];

  selectedNode: TreeNode;

  // lblOrg = '';
  // count = 0;

  public sections: any;

  //Page Models
  postSearch = "";

  //Modal Window Add New Models
  officeName = "";
  departmentName = "";
  sectionName = "";

  offices = [
    {
      offId: 1,
      offName: "Islamabad (HQ)"
    },
    {
      offId: 2,
      offName: "Lahore"
    },
    {
      offId: 3,
      offName: "Karachi"
    },
    {
      offId: 4,
      offName: "Peshawar"
    }, {
      offId: 5,
      offName: "Los Angeles, USA"
    }, {
      offId: 6,
      offName: "Toronto, Canada"
    }, {
      offId: 7,
      offName: "Dubai, UAE"
    }
  ]

  departments = [
    {
      deptId: 1,
      deptName: "Finance"
    },
    {
      deptId: 2,
      deptName: "Human Resource"
    },
    {
      deptId: 3,
      deptName: "IT"
    },
    {
      deptId: 4,
      deptName: "Sales & Marketing"
    }
  ]

  section1 = [
    {
      secId: 1,
      secName: "Internal Audit & Compliance",
      deptId: 1,
      deptName: "Finance"
    },
    {
      secId: 2,
      secName: "Budgeting & Forecasting",
      deptId: 1,
      deptName: "Finance"
    }
  ]

  section2 = [
    {
      secId: 1,
      secName: "Recruitment",
      deptId: 2,
      deptName: "Human Resource"
    },
    {
      secId: 2,
      secName: "HR Management",
      deptId: 2,
      deptName: "Human Resource"
    }
  ]

  section3 = [
    {
      secId: 1,
      secName: "IT Technologies",
      deptId: 3,
      deptName: "IT"
    },
    {
      secId: 2,
      secName: "Software Development",
      deptId: 3,
      deptName: "IT"
    }
  ]

  section4 = [
    {
      secId: 1,
      secName: "Business Development",
      deptId: 4,
      deptName: "Sales & Marketing"
    }
  ]

  posts = [
    {
      posId: 1,
      posOffice: "Islamabad (HQ)",
      posDepartment: "Finance",
      posSection: "Internal Audit & Compliance",
      posJobTitle: "Auditor",
      posQuantity: 3
    },
    {
      posId: 2,
      posOffice: "Lahore",
      posDepartment: "Human Resource",
      posSection: "Recruitment",
      posJobTitle: "HR Assistant",
      posQuantity: 1
    },
    {
      posId: 3,
      posOffice: "Karachi",
      posDepartment: "IT",
      posSection: "IT Technologies",
      posJobTitle: "IT Solution Architect",
      posQuantity: 2
    },
    {
      posId: 4,
      posOffice: "Peshawar",
      posDepartment: "Sales & Marketing",
      posSection: "Business Development",
      posJobTitle: "Marketing Assistant",
      posQuantity: 2
    },
    {
      posId: 5,
      posOffice: "Los Angeles, USA",
      posDepartment: "IT",
      posSection: "Software Development",
      posJobTitle: "Software Engineer",
      posQuantity: 1
    },
    {
      posId: 6,
      posOffice: "Toronto, Canada",
      posDepartment: "Finance",
      posSection: "Budgeting & Forecasting",
      posJobTitle: "Financial Analyst",
      posQuantity: 1
    },
    {
      posId: 7,
      posOffice: "Dubai, UAE",
      posDepartment: "Human Resource",
      posSection: "HR Management",
      posJobTitle: "HR Manager",
      posQuantity: 1
    }
  ]

  constructor(private app: AppComponent, ) { }

  ngOnInit() {
    //ngprime organizational chart data
    this.data1 = [{
      label: 'Director',
      type: 'person',
      styleClass: 'ui-person',
      expanded: true,
      data: { name: 'Ali' },
      children: [{
        label: 'Deputy Director',
        type: 'person',
        styleClass: 'ui-person',
        expanded: true,
        data: { name: 'Qureshi' },
        children: [{
          label: 'Assistant Director',
          styleClass: 'department-cfo',
          children: [{
            label: 'APS',
            styleClass: 'department-cto'
          },
          {
            label: 'Assistant',
            styleClass: 'department-cto'
          }]
        }]
      },
      {
        label: 'Deputy Director',
        type: 'person',
        styleClass: 'ui-person',
        expanded: true,
        data: { name: 'Razzaq' },
        children: [{
          label: 'Assistant Director',
          styleClass: 'department-cfo'
        }]
      }
      ]
    }];

  }

  onNodeSelect(event) {

    // this.count=this.count + 1;
    // if(this.count==1){
    //   this.lblOrg=event.node.label;
    // }

    // if(this.count==2){

    //   if(this.lblOrg==event.node.label){
    $('#myModal').modal('show');
    //     this.count=0;
    //   }
    //   else{
    //     this.count=0;
    //   }


    // }

    // window.alert(this.lblOrg);window.alert(event.node.label);window.alert(this.count);


  }

  onDeptChange(value) {
    if (value == 1) {
      this.sections = this.section1;
    }
    else if (value == 2) {
      this.sections = this.section2;
    }
    else if (value == 3) {
      this.sections = this.section3;
    }
    else if (value == 4) {
      this.sections = this.section4;
    }
  }


  //if you want to clear input
  clear() {

    // this.userId = 0;
    // this.txtUsername = '';

  }

  printDiv() {

    // var commonCss = ".commonCss{font-family: Arial, Helvetica, sans-serif; text-align: center; }";

    // var cssHeading = ".cssHeading {font-size: 25px; font-weight: bold;}";
    // var cssAddress = ".cssAddress {font-size: 16px; }";
    // var cssContact = ".cssContact {font-size: 16px; }";

    // var tableCss = "table {width: 100%; border-collapse: collapse;}    table thead tr th {text-align: left; font-family: Arial, Helvetica, sans-serif; font-weight: bole; border-bottom: 1px solid black; margin-left: -3px;}     table tbody tr td {font-family: Arial, Helvetica, sans-serif; border-bottom: 1px solid #ccc; margin-left: -3px; height: 33px;}";

    // var printCss = commonCss + cssHeading + cssAddress + cssContact + tableCss;

    var printCss = this.app.printCSS();


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

  downPDF() {
    // let doc = new jsPDF();
    // let specialElementHandlers = {
    //   '#editor': function (element, renderer) {
    //     return true;
    //   }
    // }
    // let content = this.exportPDF.nativeElement;
    // doc.fromHTML(content.innerHTML, 15, 15, {
    //   'width': 190,
    //   'elementHandlers ': specialElementHandlers
    // });
    // doc.save('testabc.pdf');
  }


  //For CSV File 
  public downloadCSV() {
    // case 1: When userSearch is empty then assign full data list
    // if (this.userSearch == "") {
    //   var completeDataList = [];
    //   for (var i = 0; i < this.userData.length; i++) {
    //     completeDataList.push({
    //       userName: this.userData[i].uName,
    //       email: this.userData[i].uEmail,
    //       role: this.userData[i].uRole,
    //       userSince: this.userData[i].uSince,
    //       lastLogin: this.userData[i].lastLogin
    //     });
    //   }
    //   this.csvExportService.exportData(completeDataList, new IgxCsvExporterOptions("UserProfileCompleteCSV", CsvFileTypes.CSV));
    // }
    // // case 2: When userSearch is not empty then assign new data list
    // else if (this.userSearch != "") {
    //   var filteredDataList = [];
    //   for (var i = 0; i < this.userData.length; i++) {

    //     if (this.userData[i].uName.toUpperCase().includes(this.userSearch.toUpperCase()) ||
    //       this.userData[i].uEmail.toUpperCase().includes(this.userSearch.toUpperCase()) ||
    //       this.userData[i].uRole.toUpperCase().includes(this.userSearch.toUpperCase()) ||
    //       this.userData[i].uSince.toUpperCase().includes(this.userSearch.toUpperCase()) ||
    //       this.userData[i].lastLogin.toUpperCase().includes(this.userSearch.toUpperCase())) {
    //       filteredDataList.push({
    //         userName: this.userData[i].uName,
    //         email: this.userData[i].uEmail,
    //         role: this.userData[i].uRole,
    //         userSince: this.userData[i].uSince,
    //         lastLogin: this.userData[i].lastLogin
    //       });
    //     }
    //   }

    //   if (filteredDataList.length > 0) {
    //     this.csvExportService.exportData(filteredDataList, new IgxCsvExporterOptions("UserProfileFilterCSV", CsvFileTypes.CSV));
    //   }
    //   else {
    //     this.toastr.errorToastr('Oops! No data found', 'Error', { toastTimeout: (2500) });
    //   }
    // }
  }


  //For Exce File
  public downloadExcel() {
    // case 1: When userSearch is empty then assign full data list
    // if (this.userSearch == "") {
    //   for (var i = 0; i < this.userData.length; i++) {
    //     this.excelDataList.push({
    //       userName: this.userData[i].uName,
    //       email: this.userData[i].uEmail,
    //       role: this.userData[i].uRole,
    //       userSince: this.userData[i].uSince,
    //       lastLogin: this.userData[i].lastLogin
    //     });
    //   }

    //   this.excelExportService.export(this.excelDataContent, new IgxExcelExporterOptions("UserProfileCompleteExcel"));
    //   this.excelDataList = [];
    // }
    // // case 2: When userSearch is not empty then assign new data list
    // else if (this.userSearch != "") {

    //   for (var i = 0; i < this.userData.length; i++) {
    //     if (this.userData[i].uName.toUpperCase().includes(this.userSearch.toUpperCase()) ||
    //       this.userData[i].uEmail.toUpperCase().includes(this.userSearch.toUpperCase()) ||
    //       this.userData[i].uRole.toUpperCase().includes(this.userSearch.toUpperCase()) ||
    //       this.userData[i].uSince.toUpperCase().includes(this.userSearch.toUpperCase()) ||
    //       this.userData[i].lastLogin.toUpperCase().includes(this.userSearch.toUpperCase())) {
    //       this.excelDataList.push({
    //         userName: this.userData[i].uName,
    //         email: this.userData[i].uEmail,
    //         role: this.userData[i].uRole,
    //         userSince: this.userData[i].uSince,
    //         lastLogin: this.userData[i].lastLogin
    //       });
    //     }
    //   }

    //   if (this.excelDataList.length > 0) {

    //     this.excelExportService.export(this.excelDataContent, new IgxExcelExporterOptions("UserProfileFilterExcel"));
    //     this.excelDataList = [];

    //   }
    //   else {
    //     this.toastr.errorToastr('Oops! No data found', 'Error', { toastTimeout: (2500) });
    //   }
    // }
  }

}
