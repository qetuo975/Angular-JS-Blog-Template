import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({  
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  BlogData: Array<any> = [];
  pageSize = 8;
  page = 13;

  constructor(private blogService: BlogService, public dialog: MatDialog) { }
   
  ngOnInit(): void {
    this.getBlogList();
  }

  getBlogList() {
    this.blogService.getPosts().subscribe((response) => {
      this.BlogData = response;
    })
  }

  openDialog(element : any, model : boolean) {
    const dialogRef = this.dialog.open(DialogComponent, { data: { blog: element, isModel: model }});
    dialogRef.afterClosed().subscribe(result => {
      this.getBlogList();
    });
  }
}
