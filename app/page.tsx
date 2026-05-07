"use client";

import { FormEvent, useMemo, useState } from "react";
import libraryItems from "../data/library_items.json";

type LibraryItem = {
  id: number;
  title: string;
  item_type: "Book" | "Magazine" | "Journal";
  isbn: string;
  issn: string;
  shelf_number: number;
  level_number: number;
  position_number: number;
  location_label: string;
  notes: string;
};

const items = libraryItems as LibraryItem[];

export default function Home() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const trimmedQuery = submittedQuery.trim();

  const results = useMemo(() => {
    if (!trimmedQuery) {
      return [];
    }

    const normalizedQuery = trimmedQuery.toLocaleLowerCase();

    return items.filter((item) => {
      const normalizedTitle = item.title.toLocaleLowerCase();

      return (
        normalizedTitle.includes(normalizedQuery) ||
        item.isbn === trimmedQuery ||
        item.issn === trimmedQuery
      );
    });
  }, [trimmedQuery]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedQuery(query);
    setHasSearched(true);
  }

  return (
    <main className="page-shell">
      <section className="app-card" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">Private library demo</p>
          <h1 id="page-title">Smart Shelf Finder</h1>
          <p className="intro">
            Search a title, ISBN, or ISSN to find the exact shelf location in a
            {" "}
            <a href="/files/available_books.txt" target="_blank" rel="noreferrer">
              100-item
            </a>{" "}
            demo collection.
          </p>
        </div>

        <form className="search-card" onSubmit={handleSubmit}>
          <label htmlFor="search" className="search-label">
            Find an item
          </label>
          <div className="search-row">
            <input
              id="search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, ISBN, or ISSN"
              aria-describedby="search-example"
            />
            <button type="submit">Search</button>
          </div>
          <p id="search-example" className="example-text">
            Try: Arabic Chef Recipes or 9781-0791
          </p>
        </form>

        <section className="results-section" aria-live="polite">
          {!hasSearched ? (
            <div className="empty-state">
              Enter a book, magazine, journal, ISBN, or ISSN to locate it.
            </div>
          ) : !trimmedQuery ? (
            <div className="empty-state">
              Please enter a title, ISBN, or ISSN to search the library.
            </div>
          ) : results.length === 0 ? (
            <div className="empty-state">
              No item found. Try another title, ISBN, or ISSN.
            </div>
          ) : (
            <>
              <div className="results-heading">
                <h2>Results</h2>
                <span>
                  {results.length} {results.length === 1 ? "match" : "matches"}
                </span>
              </div>
              <div className="results-grid">
                {results.map((item) => (
                  <article className="result-card" key={item.id}>
                    <div className="card-topline">
                      <span>{item.item_type}</span>
                      <span>Item #{item.id}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <dl className="metadata">
                      <div>
                        <dt>Type</dt>
                        <dd>{item.item_type}</dd>
                      </div>
                      <div>
                        <dt>{item.isbn ? "ISBN" : "ISSN"}</dt>
                        <dd>{item.isbn || item.issn}</dd>
                      </div>
                    </dl>
                    <p className="location">
                      Shelf {item.shelf_number} <span>·</span> Level{" "}
                      {item.level_number} <span>·</span> Position{" "}
                      {item.position_number}
                    </p>
                    <p className="exact-place">
                      Exact place: {item.location_label}
                    </p>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </section>
    </main>
  );
}
