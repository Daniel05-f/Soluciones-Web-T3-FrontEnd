import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-calculator',
  styleUrl: './calculator.css',
  templateUrl: './calculator.html',
})
export class Calculator {
  display: string = '0';
  firstOperand: number | null = null;
  operator: string | null = null;
  waitingForSecondOperand: boolean = false;

  @Input() message: string = 'Professional Calculator';
  @Output() resultChange = new EventEmitter<number>();

  appendNumber(num: string) {
    if (this.waitingForSecondOperand) {
      this.display = num;
      this.waitingForSecondOperand = false;
    } else {
      this.display = this.display === '0' ? num : this.display + num;
    }
  }

  setOperator(nextOperator: string) {
    const inputValue = parseFloat(this.display);

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.calculate(this.firstOperand, inputValue, this.operator);
      this.display = String(result);
      this.firstOperand = result;
      this.resultChange.emit(result);
    }

    this.waitingForSecondOperand = true;
    this.operator = nextOperator;
  }

  calculate(first: number, second: number, op: string): number {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '*': return first * second;
      case '/': return second !== 0 ? first / second : 0;
      default: return second;
    }
  }

  compute() {
    if (this.operator === null || this.waitingForSecondOperand) return;

    const inputValue = parseFloat(this.display);
    const result = this.calculate(this.firstOperand!, inputValue, this.operator);

    this.display = String(result);
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
    this.resultChange.emit(result);
  }

  clear() {
    this.display = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }
}
