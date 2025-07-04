import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { Consumption } from '../../models/consumption';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiFacade } from '../../services/api.facade';

@Component({
  selector: 'app-consume-display',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './consumption-display.html',
  styleUrl: './consumption-display.css',
})
export class ConsumptionDisplay implements OnInit {
  protected memberName: string | null = null;
  protected categories: Category[] | null = null;
  protected consumptions: Consumption[] | null = null;
  protected newConsumptions: { [catId: string]: number } = {};

  constructor(private router: Router, private apiFacade: ApiFacade) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state;
    this.memberName = state?.['name'];
    this.consumptions = state?.['consumptions'] || [];
    console.log(JSON.stringify(this.newConsumptions));
  }

  ngOnInit(): void {
    this.apiFacade.getCategories().subscribe((cats) => {
      this.categories = cats;
      for (const c of this.categories) {
        this.newConsumptions[c.id] = 0;
      }
    });
  }

  protected getConsume(catId: string): number {
    return (
      this.consumptions?.find((c) => c.categoryId === catId)?.quantity ?? 0
    );
  }

  protected saveConsumptions() {
    // TODO: Implementieren
    throw new Error('Method not implemented.');
  }

  protected decreaseConsume(catId: string): void {
    this.newConsumptions[catId] = this.newConsumptions[catId] - 1;
    if (this.newConsumptions[catId] < 0) {
      this.newConsumptions[catId] = 0;
    }
  }

  increaseConsume(catId: string): void {
    this.newConsumptions[catId] = this.newConsumptions[catId] + 1;
  }

  clearConsume(catId: string): void {
    this.newConsumptions[catId] = 0;
  }
}
