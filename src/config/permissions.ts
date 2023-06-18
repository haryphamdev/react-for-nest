export const ALL_PERMISSIONS = {
    COMPANIES: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/companies', module: "COMPANIES" },
        CREATE: { method: "POST", apiPath: '/api/v1/companies', module: "COMPANIES" },
        UPDATE: { method: "PATCH", apiPath: '/api/v1/companies/:id', module: "COMPANIES" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/companies/:id', module: "COMPANIES" },
    }
}