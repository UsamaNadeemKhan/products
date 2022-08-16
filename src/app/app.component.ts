import { Component, OnInit } from '@angular/core';

interface ItemData {
  id: number;
  subItemCode: number;
  itemName: string;
  price: string;
  rating: number;
  status: string;
  approved: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  listOfColumn = [
    {
      title: 'Sub Item Code',
    },
    {
      title: 'Item Name',
    },
    {
      title: 'Price',
    },
    {
      title: 'Rating',
    },
    {
      title: 'Status',
    },
    {
      title: 'Approved',
    },
    {
      title: 'Action',
    },
  ];
  tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  value = 3;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  listOfData: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();
  filteredData: ItemData[] = [];

  pageIndex = 1;
  pageSize = 10;

  ngOnInit(): void {
    this.listOfData = new Array(1).fill(0).map((_, index) => ({
      id: index,
      subItemCode: 925122014 + index,
      itemName: `Product ${index}`,
      price: (2 + index).toFixed(2),
      rating: 2,
      status: 'Active',
      approved: 'InProgress',
    }));
    this.filterProducts(null);
  }

  filterProducts(e: any) {
    const keyword = e?.value;
    if (!keyword) {
      this.filteredData = this.listOfData.map((item) => item);
    } else {
      this.filteredData = this.listOfData.filter(
        (item) =>
          item.subItemCode.toString().includes(keyword) ||
          item.itemName.toLocaleLowerCase().includes(keyword)
      );
    }
  }

  PageIndexChange(pIndex: number) {
    this.pageIndex = pIndex
    console.log('page index', pIndex);
  }

  PageSizeChange(pSize: number) {
    this.pageSize = pSize
    console.log('page size', pSize);
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach((item) =>
      this.updateCheckedSet(item.id, value)
    );
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some((item) =>
        this.setOfCheckedId.has(item.id)
      ) && !this.checked;
  }
}
