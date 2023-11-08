import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentService } from 'src/app/services/comment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  isModel: boolean = false;
  imageUrl: string = '';
  title: string = '';
  content: string = '';
  commentData: any;

  form = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });

  constructor(
    private blogService: BlogService,
    private commentService: CommentService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {
    if (data.isModel) {
      this.isModel = true;
      this.form.patchValue({
        title: data.blog.title,
        content: data.blog.body,
      });
    } else {
      this.imageUrl = data.blog.imageId.toString();
      this.title = data.blog.title;
      this.content = data.blog.body;
    }
  }

  ngOnInit(): void {
    this.commentService.getCommments().subscribe((response) => {
      this.commentData = response.filter(
        (x: { postId: any }) => x.postId == this.data.blog.id
      );
    });
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    const request = {
      title: this.form.get('title')?.value,
      body: this.form.get('content')?.value,
      imageId: this.data.blog.imageId,
      userId: this.data.blog.userId,
    };

    this.blogService
      .updatePosts(this.data.blog.id, request)
      .subscribe((response) => { this.close(); });
  }
}
