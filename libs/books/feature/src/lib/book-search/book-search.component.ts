import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];
  private unsubscribe$ = new Subject<void>();

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });

    // Subscribe to search term changes with debouncing
    this.searchForm.controls.term.valueChanges.pipe(
      debounceTime(500), // Add debouncing
      distinctUntilChanged(), // Ensure the term has changed before making a new request
      takeUntil(this.unsubscribe$) // Cleanup subscription on component destroy
    ).subscribe(term => {
      this.searchBooks(term);
    });
  }

  get searchTerm(): string {
        return this.searchForm.value.term;
      }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
  }

  searchBooks(term: string) {
    if (term) {
      this.store.dispatch(searchBooks({ term }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
