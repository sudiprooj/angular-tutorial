import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/product/product.service';
import { Product } from 'src/app/product/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productArray: Product[];
  productForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.productService.getProducts().subscribe(res=>{
      this.productArray = res
    }, err => {
      console.log(err);
    });
  }

  onSubmit(){
    this.productService.postProduct(this.productForm.value).subscribe(res=>{
      console.log(res);
      this.productArray.push(res);
    })
  }

  editProduct(id: number){

  }

  deleteProduct(id: number){
    this.productService.deleteProduct(id).subscribe(res=>{
      console.log(res);
      let index = this.productArray.findIndex(item => item.id === id);
      console.log(index);
      this.productArray = this.productArray.splice(index, 1)
    })
  }

}
