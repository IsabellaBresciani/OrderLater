import baseURL from "./baseURL";

/**
 * Service to create a new order.
 *
 * Endpoint: POST /api/orders
 *
 * @param {Object} data - The order details to send.
 * @param {string} data.user_id - The ID of the user.
 * @param {string} data.shop_id - The ID of the shop.
 * @param {Array<Object>} data.products - An array of product objects.
 * @param {string} data.delivery_date - The desired delivery date in 'YYYY-MM-DD' format.
 * @param {string} authToken - The Bearer token for authentication.
 * @returns {Promise<Object>} A promise that resolves with the parsed JSON data from the successful response.
 * @throws {Error} Throws an error if the network request fails or the server returns a non-200 status code.
 */
async function orderCreate(data, authToken) {
    const endpoint = '/api/orders';

    try {
        const response = await fetch(baseURL() + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(data)
        });

        // Check if the response was successful
        if (!response.ok) {
            let errorMessage = `HTTP error! Status: ${response.status}`;
            const errorData = await response.json().catch(() => null);
            if (errorData && errorData.message) {
                errorMessage = errorData.message;
            }
            throw new Error(errorMessage);
        }

        // Return the parsed JSON data
        return await response.json();

    } catch (error) {
        // Log the full error for debugging
        console.error("Order creation failed:", error);
        // Re-throw the error with a user-friendly message
        if (error.message.includes('HTTP error')) {
            throw new Error(`Order creation failed: ${error.message}. Please check your connection and try again.`);
        }
        throw new Error(`Order creation failed: ${error.message}`);
    }
}

export default orderCreate;