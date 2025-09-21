import baseURL from "./baseURL";

/**
 * Service to create a new order.
 * 
 * Endpoint: POST /api/orders
 * 
 * @param {Object} data - Order details
 * @param {string} authToken - Bearer token for authentication
 * @returns {Promise<Response>} Fetch API response
 */
function orderCreate(data, authToken) {
    const endpoint = '/api/orders';
    return fetch(baseURL() + endpoint, { 
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify(data) 
    });
}

export default orderCreate;