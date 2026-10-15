from pathlib import Path
import sys

try:
    import PyPDF2
except Exception as e:
    print('IMPORT_ERROR', repr(e))
    sys.exit(1)

pdf_path = Path(r'd:\my_profile\my-portfolio\Viswanadh-Ganti-CV.pdf')
print(f'PDF_EXISTS={pdf_path.exists()}')
print(f'PDF_SIZE={pdf_path.stat().st_size if pdf_path.exists() else 0}')
reader = PyPDF2.PdfReader(str(pdf_path))
print(f'PAGE_COUNT={len(reader.pages)}')
for i, page in enumerate(reader.pages, start=1):
    text = page.extract_text() or ''
    print(f'--- PAGE {i} START ---')
    print(text[:4000])
    print(f'--- PAGE {i} END ---')
