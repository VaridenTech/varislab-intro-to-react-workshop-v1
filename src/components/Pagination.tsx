type PaginationProps = {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
};

export default function Pagination({
  page,
  pageCount,
  onChange,
}: PaginationProps) {
  return (
    <nav className="pagination" aria-label="Pages">
      <button
        type="button"
        className="button button--ghost"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        ← Previous
      </button>
      <span className="pagination__status">
        Page {page} of {pageCount}
      </span>
      <button
        type="button"
        className="button button--ghost"
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
      >
        Next →
      </button>
    </nav>
  );
}
