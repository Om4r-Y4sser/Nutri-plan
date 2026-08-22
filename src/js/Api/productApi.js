const BASE_URL = "https://nutriplan-api.vercel.app/api";


export async function searchProducts(query) {

    const response = await fetch(
        `${BASE_URL}/products/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error("Failed to search products");
    }

    const data = await response.json();

    return data;
}


export async function getProductByBarcode(barcode) {

    const response = await fetch(
        `${BASE_URL}/products/barcode/${barcode}`
    );

    if (!response.ok) {
        throw new Error("Failed to find product");
    }

    const data = await response.json();

    return data;
}


export async function getProductsByCategory(category) {

    const response = await fetch(
        `${BASE_URL}/products/category/${encodeURIComponent(category)}`
    );

    if (!response.ok) {
        throw new Error("Failed to load products by category");
    }

    const data = await response.json();

    return data;
}


export async function getProductCategories() {

    const response = await fetch(
        `${BASE_URL}/products/categories`
    );

    if (!response.ok) {
        throw new Error("Failed to load product categories");
    }

    const data = await response.json();

    return data;
}