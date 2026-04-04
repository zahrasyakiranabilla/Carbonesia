/**
 * Global Pagination Types
 * Reusable types for paginated data responses across the application
 */

/**
 * Pagination metadata returned by the API
 */
export interface PaginationMeta {
  /** Current page number (1-based) */
  page: number
  /** Number of items per page */
  limit: number
  /** Total number of items across all pages */
  total: number
  /** Total number of pages */
  totalPages: number
}

/**
 * Generic paginated response wrapper
 * Use this for all list endpoints that return paginated data
 *
 * @example
 * ```typescript
 * interface UserListResponse extends PaginatedResponse<User> {}
 * // Results in: { data: User[], meta: PaginationMeta }
 * ```
 */
export interface PaginatedResponse<T> {
  /** Array of data items for the current page */
  data: T[]
  /** Pagination metadata */
  meta: PaginationMeta
}

/**
 * Common filter parameters for paginated list requests
 */
export interface PaginationParams {
  /** Page number (1-based) */
  page?: number
  /** Number of items per page */
  limit?: number
}

/**
 * Combined filter with search and pagination
 * Extend this for feature-specific filters
 *
 * @example
 * ```typescript
 * interface EmployeeFilters extends PaginatedFilters {
 *   search?: string
 *   role?: 'admin' | 'employee'
 * }
 * ```
 */
export interface PaginatedFilters extends PaginationParams {
  /** Search query string */
  search?: string
}
