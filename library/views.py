from django.http import HttpResponse

from library.models import Book


def book_list(request):
    # before-books = Book.objects.all(), this ran select * from library_book; which accessed book.author.name  
    books = Book.objects.select_related("author").all() 
    lines = "".join(
        f"<p>{book.title} by {book.author.name}</p>" for book in books
    )
    return HttpResponse(f"<h1>Books</h1>{lines}")