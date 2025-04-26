import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';

export interface PeriodicElement {
  id: number;
  name: string;
  weight: number;
  price: string;
  creationDate: string;
  description: string;
}

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  standalone: true,
  imports: [SharedModule],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class QueryListComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @Input() selectedTab: any;
  @Input() ELEMENT_DATA!: Array<PeriodicElement>;

  displayedColumns: string[] = ['id', 'Email', 'Phone', 'Message'];
  keyExpansion: any = {
    id: 'queryID',
    Email: 'queryEmail',
    Phone: 'queryPhone',
    Message: 'queryMessage',
  };
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: PeriodicElement | null;
  dataSource!: MatTableDataSource<PeriodicElement>;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const filteredElementData = changes['ELEMENT_DATA'];
    if (
      !filteredElementData.firstChange &&
      filteredElementData.currentValue !== filteredElementData.previousValue
    ) {
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator.firstPage();
    }
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}
