import DataTable from "@/components/client/data-table";
import { FileSearchOutlined } from "@ant-design/icons";
import { ProColumns } from '@ant-design/pro-components';
import { Space } from "antd";

const CompanyPage = () => {
    const columns: ProColumns<any>[] = [
        {
            title: 'Ref Num',
            key: 'refNum',
            dataIndex: 'refNum',
            ellipsis: true,
            width: 300,
            copyable: true,
        },
        {
            title: 'MG',
            key: 'mgId',
            dataIndex: 'mgId',
            width: 125,
        },

        {
            title: 'FT Fee ID',
            key: 'ftFeeId',
            dataIndex: 'ftFeeId',
            ellipsis: true,
            width: 200,
            copyable: true,
            hideInSearch: true,
        },
        {
            title: 'FT Payment ID',
            key: 'ftPaymentId',
            dataIndex: 'ftPaymentId',
            ellipsis: true,
            width: 200,
            copyable: true,
            hideInSearch: true,
        },

        {
            key: 'action',
            render: (_value, entity, _index, _action) => (
                <Space>
                    <FileSearchOutlined
                        style={{
                            marginLeft: 10,
                            fontSize: 20,
                            color: '#d81921',
                        }}
                        type=""
                        onClick={() => {
                            //   setVisible(true);
                            //   setSelectedItem(entity);
                        }}
                    />
                </Space>
            ),
            hideInSearch: true,
            width: 50,
        },
    ];
    return (
        <div>
            <DataTable
                // loading={isFetching}
                // columns={columns}
                // dataSource={response?.data.results}
                request={async (params, sort, _filter): Promise<any> => {

                }}
                scroll={{ x: 2500 }}
                // pagination={{ ...response?.data.meta }}
                rowSelection={{}}
            // toolBarRender={(_action, _rows): any => {
            //   const accessible = API_URLS.reconciliation.getPaymentHistories();

            //   return (
            //     <AccessDenied accessible={accessible}>
            //       <Button type="primary">Export CSV</Button>
            //     </AccessDenied>
            //   );
            // }}
            />
        </div>
    )
}

export default CompanyPage;