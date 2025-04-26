import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import xlsx from 'json-as-xlsx';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { WebService } from 'src/app/shared/services/web.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { QueryListComponent } from './query-list/query-list.component';

export interface Tab {
  name: string;
  month: number;
  filterOption?: string;
  isSelected: boolean;
}

@Component({
  selector: 'app-query-view',
  standalone: true,
  imports: [SharedModule, QueryListComponent],
  templateUrl: './query-view.component.html',
})
export class QueryViewComponent implements OnInit {
  emailList: any;
  productAssetPath = `${environment.assestsBasePath}images/Product Page`;
  tabs: Array<Tab> = [
    {
      name: 'All',
      month: 0,
      isSelected: false,
    },
    {
      name: 'Today',
      month: 3,
      filterOption: 'today',
      isSelected: false,
    },
    {
      name: 'This week',
      month: 6,
      filterOption: 'week',
      isSelected: false,
    },
    {
      name: 'This month',
      month: 6,
      filterOption: 'month',
      isSelected: false,
    },
  ];
  ELEMENT_DATA: Array<any> = [];
  filteredElementData: Array<any> = this.ELEMENT_DATA;
  selectedTab!: Tab;
  queryList = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private loaderService: LoaderService,
    private webStorage: WebService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.queryList = data.queryData.responsePayload.queryList;
      this.filteredElementData = this.queryList;
    });
  }

  downloadExcel(): void {
    const headers = new HttpHeaders({
      h1: 'v1',
      authorization: `Bearer ${this.webStorage.getAuthentication}`,
    });
    const url = `${environment.baseUrl}/getQuery`;
    this.http.post(url, {}, { headers }).subscribe((data: any) => {
      if (data && !data?.hasError) {
        this.queryList = data.responsePayload.queryList; // Use queryList from response
        this.loaderService.setLoading(true, url);

        setTimeout(() => {
          this.download(this.queryList); // Pass queryList to download method
          this.loaderService.setLoading(false, url);
        }, 1500);

        /* pass here the table id */
      }
    });
  }

  download(jsonData: any): void {
    let data = [
      {
        sheet: 'Queries', // Update sheet name as needed
        columns: [
          { label: 'Email', value: 'queryEmail' },
          { label: 'Phone', value: 'queryPhone' },
          { label: 'Message', value: 'queryMessage' },
        ],
        content: jsonData.map((eachData: any) => {
          return {
            queryEmail: eachData.queryEmail,
            queryPhone: eachData.queryPhone,
            queryMessage: eachData.queryMessage,
          };
        }),
      },
    ];

    let settings = {
      fileName: `all-contacts-${this.getCurrentDate()}`, // Name of the resulting spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeMode: 'writeFile', // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
      RTL: false, // Display the columns from right-to-left (the default value is false)
    };

    xlsx(data, settings);
  }

  getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  navigateToControlPanel(): void {
    this.router.navigate(['admin/admin-dashboard']);
  }

  changeTableData(event: MatTabChangeEvent) {
    this.tabs.forEach((eachTab: any) => (eachTab.isSelected = false));
    this.tabs[event.index].isSelected = true;
    this.selectedTab = this.tabs[event.index];

    this.filteredElementData = [];
    const headers = new HttpHeaders({
      h1: 'v1',
      authorization: `Bearer ${this.webStorage.getAuthentication}`,
    });
    this.http
      .post(
        `${environment.baseUrl}/getQuery`,
        { filter: this.selectedTab.filterOption },
        { headers: headers }
      )
      .subscribe((data: any) => {
        if (data && !data.hasError) {
          this.filteredElementData = data.responsePayload.queryList;
        }
      });
  }
}
