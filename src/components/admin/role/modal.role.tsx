import { FooterToolbar, ModalForm, ProCard, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { Col, Form, Row, message, notification } from "antd";
import { isMobile } from 'react-device-detect';
import { callCreateRole, callFetchPermission, callUpdateRole } from "@/config/api";
import { IPermission, IRole } from "@/types/backend";
import { CheckSquareOutlined } from "@ant-design/icons";
import ModuleApi from "./module.api";
import { useState, useEffect } from 'react';
import _ from 'lodash';

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    dataInit?: IRole | null;
    setDataInit: (v: any) => void;
    reloadTable: () => void;
}



const ModalRole = (props: IProps) => {
    const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;
    const [form] = Form.useForm();

    const [listPermissions, setListPermissions] = useState<{
        module: string;
        permissions: IPermission[]
    }[] | null>(null);

    useEffect(() => {
        const init = async () => {
            const res = await callFetchPermission(`current=1&pageSize=100`);
            if (res.data?.result) {
                const result = _(res.data?.result)
                    .groupBy(x => x.module)
                    .map((value, key) => {
                        value = value.map(item => {
                            item.isSelected = false;
                            return item;
                        });
                        return { module: key, permissions: value };
                    })
                    .value();
                setListPermissions(result)
            }
        }
        init();
    }, [])

    const submitRole = async (valuesForm: any) => {
        const { name, description, isActive, permissions } = valuesForm;
        if (dataInit?._id) {
            //update
            const role = {
                name, description, isActive, permissions
            }

            const res = await callUpdateRole(role, dataInit._id);
            if (res.data) {
                message.success("Cập nhật role thành công");
                handleReset();
                reloadTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        } else {
            //create
            const role = {
                name, description, isActive, permissions
            }
            const res = await callCreateRole(role);
            if (res.data) {
                message.success("Thêm mới role thành công");
                handleReset();
                reloadTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        }
    }

    const handleReset = async () => {
        form.resetFields();
        setDataInit(null);
        setOpenModal(false);
    }

    return (
        <>
            <ModalForm
                title={<>{dataInit?._id ? "Cập nhật Role" : "Tạo mới Role"}</>}
                open={openModal}
                modalProps={{
                    onCancel: () => { handleReset() },
                    afterClose: () => handleReset(),
                    destroyOnClose: true,
                    width: isMobile ? "100%" : 900,
                    keyboard: false,
                    maskClosable: false,
                }}
                scrollToFirstError={true}
                preserve={false}
                form={form}
                onFinish={submitRole}
                initialValues={dataInit?._id ? dataInit : {}}
                submitter={{
                    render: (_: any, dom: any) => <FooterToolbar>{dom}</FooterToolbar>,
                    submitButtonProps: {
                        icon: <CheckSquareOutlined />
                    },
                    searchConfig: {
                        resetText: "Hủy",
                        submitText: <>{dataInit?._id ? "Cập nhật" : "Tạo mới"}</>,
                    }
                }}
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Tên Role"
                            name="name"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                            ]}
                            placeholder="Nhập name"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormSwitch
                            label="Trạng thái"
                            name="isActive"
                            checkedChildren="ACTIVE"
                            unCheckedChildren="INACTIVE"
                            initialValue={true}
                            fieldProps={{
                                defaultChecked: true,
                            }}
                        />
                    </Col>

                    <Col span={24}>
                        <ProFormTextArea
                            label="Miêu tả"
                            name="description"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập miêu tả role"
                            fieldProps={{
                                autoSize: { minRows: 2 }
                            }}
                        />
                    </Col>
                    <Col span={24}>
                        <ProCard
                            title="Quyền hạn"
                            subTitle="Các quyền hạn được phép cho vai trò này"
                            headStyle={{ color: '#d81921' }}
                            style={{ marginBottom: 20 }}
                            headerBordered
                            size="small"
                            bordered
                        >
                            <ModuleApi
                                // onChange={onChangeModuleApi}
                                initData={(dataInit?.permissions)}
                                form={form}
                                listPermissions={listPermissions}
                            />

                        </ProCard>

                    </Col>
                </Row>
            </ModalForm>
        </>
    )
}

export default ModalRole;
