import {
    ParamsType,
    ProTable,
    ProTableProps,
} from '@ant-design/pro-components';
//   import { getLocale } from '@umijs/max';
// import styles from './styles.module.scss';

const DataTable = <
    T extends Record<string, any>,
    U extends ParamsType = ParamsType,
    ValueType = 'text',
>({
    columns,
    defaultData = [],
    dataSource,
    postData,
    // locale = getLocale(),
    pagination,
    sticky = { offsetHeader: 50 },
    loading,
    rowKey = (record) => record.id,
    scroll = { x: 2000 },
    params,
    request,
    search,
    polling,
    toolBarRender,
    headerTitle,
    actionRef,
    dateFormatter = 'string',
    rowSelection,
}: ProTableProps<T, U, ValueType>) => {
    return (
        <ProTable<T, U, ValueType>
            // className={styles.table}
            columns={columns}
            defaultData={defaultData}
            dataSource={dataSource}
            postData={postData}
            // locale={locale}
            pagination={pagination}
            sticky={sticky}
            loading={loading}
            rowKey={rowKey}
            scroll={scroll}
            params={params}
            request={request}
            search={search}
            polling={polling}
            toolBarRender={toolBarRender}
            headerTitle={headerTitle}
            actionRef={actionRef}
            dateFormatter={dateFormatter}
            rowSelection={rowSelection}
        />
    );
};

export default DataTable;
