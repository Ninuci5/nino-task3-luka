"use client";

import { useEffect, useState } from "react";
import styles from "./products.module.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=20")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (product) => {
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
    setDeleted((prev) => [...prev, product]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.wrapper}>
      <section>
        <h2>Products</h2>
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <button onClick={() => handleDelete(product)}>Delete</button>
            </div>
          ))}
        </div>
      </section>

      {deleted.length > 0 && (
        <section>
          <h2>Deleted</h2>
          <div className={styles.grid}>
            {deleted.map((product) => (
              <div key={product.id} className={styles.card}>
                <img src={product.thumbnail} alt={product.title} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
