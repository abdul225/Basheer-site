import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  items = ['Why is the moon sometimes out during the day?', 'Why is the sky blue?', 'Will we ever discover aliens?', 'How much does the Earth weigh?', 'How do airplanes stay up?'];
  expandedIndex = 0;
}
