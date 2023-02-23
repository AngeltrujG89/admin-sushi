import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from "./types";

@Component({
  selector: 'app-head-promos',
  templateUrl: './head-promos.component.html',
  styleUrls: ['./head-promos.component.scss'],
})
export class HeadPromosComponent implements OnInit {

  @Input() items: Item[] = [];
  @Input() selectedItems: string[] = [];
  @Input() title = 'Seleciona los productos que imgresaran a la promocion';

  @Output() selectionCancel = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<string[]>();
  
  filteredItems: Item[] = [];
  workingSelectedValues: string[] = [];
  
  ngOnInit() {
    this.filteredItems = [...this.items];
    this.workingSelectedValues = [...this.selectedItems];
  }
  
  trackItems(index: number, item: Item) {
    return item.value;
  }
  
  cancelChanges() {
    this.selectionCancel.emit();
  }
  
  confirmChanges() {
    console.log(this.workingSelectedValues)
    this.selectionChange.emit(this.workingSelectedValues);
  }
  
  searchbarInput(ev : any) {
    this.filterList(ev.target.value);
  }
  
  /**
   * Update the rendered view with
   * the provided search query. If no
   * query is provided, all data
   * will be rendered.
   */
  filterList(searchQuery: string | undefined) {
    /**
     * If no search query is defined,
     * return all options.
     */
    if (searchQuery === undefined) {
      this.filteredItems = [...this.items];
    } else {
      /**
       * Otherwise, normalize the search
       * query and check to see which items
       * contain the search query as a substring.
       */
      const normalizedQuery = searchQuery.toLowerCase(); 
      this.filteredItems = this.items.filter(item => {
        return item.value.includes(normalizedQuery);
      });
    }
  }

  isChecked(value: string) {
    return this.workingSelectedValues.find(item => item === value);
  }
  
  checkboxChange(ev: any) {
    const { checked, value } = ev.detail;
    
    if (checked) {
      this.workingSelectedValues = [
        ...this.workingSelectedValues,
        value
      ]
    } else {
      this.workingSelectedValues = this.workingSelectedValues.filter(item => item !== value);
    }
  }

  selectAllItems(id : string){
    const checkAll = document.getElementById(id) as HTMLIonCheckboxElement
    const initialState = checkAll.checked;
    const checkItems = document.getElementsByTagName("ion-checkbox");

    for(let i = 0; i < checkItems.length; i++){
      if(checkItems[i].id !== id){
        console.log(checkItems[i])
        checkItems[i].checked = initialState;
      }
    }
  }

}
