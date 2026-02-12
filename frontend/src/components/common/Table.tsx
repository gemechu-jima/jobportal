import type { ReactNode } from 'react';

interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => ReactNode);
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (item: T) => void;
    isLoading?: boolean;
}

const Table = <T,>({ data, columns, onRowClick, isLoading }: TableProps<T>) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-10 text-center">
                                Loading...
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-10 text-center">
                                No data found.
                            </td>
                        </tr>
                    ) : (
                        data.map((item, rowIndex) => (
                            <tr
                                key={rowIndex}
                                onClick={() => onRowClick?.(item)}
                                className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600' : ''
                                    }`}
                            >
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4">
                                        {typeof column.accessor === 'function'
                                            ? column.accessor(item)
                                            : (item[column.accessor] as ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
