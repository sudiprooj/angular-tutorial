import { Component, OnInit } from '@angular/core';

interface Product {
  id: number,
  name: string,
  image: string,
  price: number
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  productArray: Product[];
  constructor() { }

  ngOnInit() {
    this.productArray = [
      {
        id: 1,
        name: 'Camera',
        image: 'https://rukminim1.flixcart.com/image/416/416/j4x207k0/television/2/p/t/lg-24lj470a-original-imaevq28saz6yq7h.jpeg?q=70',
        price: 300
      },
      {
        id: 2,
        name: 'TV',
        image: 'https://rukminim1.flixcart.com/image/416/416/j4x207k0/television/2/p/t/lg-24lj470a-original-imaevq28saz6yq7h.jpeg?q=70',
        price: 300
      },
      {
        id: 3,
        name: 'Computer',
        image: 'https://rukminim1.flixcart.com/image/416/416/j4x207k0/television/2/p/t/lg-24lj470a-original-imaevq28saz6yq7h.jpeg?q=70',
        price: 300
      },
      {
        id: 4,
        name: 'Mobile',
        image: 'https://rukminim1.flixcart.com/image/416/416/jyxaw7k0/mobile/u/v/p/realme-c2-rmx1941-original-imaffnumygt8wgfx.jpeg?q=70',
        price: 300
      }
    ]
  }

}
