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
      id: [''],
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
    if(this.productForm.get("id").value === ""){
      this.productService.postProduct(this.productForm.value).subscribe(res=>{
        console.log(res);
        this.productArray.push(res);
      })
    }else{
      this.productService.putProduct(this.productForm.value).subscribe(res=>{
        console.log(res);
        let index = this.productArray.findIndex(obj => obj.id === this.productForm.get("id").value);
        this.productArray.splice(index, 1, res);
      })
    }
  }

  editProduct(id: number){
    this.productService.getProductDetails(id).subscribe(res=>{
      this.productForm.get("id").setValue(res.id);
      this.productForm.get("name").setValue(res.name);
      this.productForm.get("price").setValue(res.price);
    })
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
